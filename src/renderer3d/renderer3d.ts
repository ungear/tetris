import { Game } from "../../typing/game";
import { Store } from "redux";
import * as THREE from "three";
import * as Helpers from "./helpers";
import * as Config from "./config";
import { DevPanel } from "./devPanel";
import { calculateBlockCoords } from "./helpers";
import { animationFrames, map, pairwise } from 'rxjs';

const ScoreCanvas = {
  width: 128,
  height: 64,
  font: "48px Courier New",
  fontX: 10,
  fontY: 50,
  fontColor: "#aa0000"
};

export class Renderer3d {
  store: Store<Game>;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  scoreCanvasContext: CanvasRenderingContext2D;
  scoreMaterial: THREE.MeshBasicMaterial;
  previousScore: number;
  isShaking: boolean = false;
  shakingProgressPrecents: number;
  light: THREE.PointLight;
  isDevelopment = false;
  devPanel: DevPanel;

  constructor(store: Store<Game>) {
    this.store = store;
    const { board } = this.store.getState();
    const boardWidthPx = Config.Block.Size * board.width;
    const boardHeightPx = Config.Block.Size * board.height;

    this.renderer = new THREE.WebGLRenderer({antialias: true});

    this.renderer.setSize(window.innerWidth -1, window.innerHeight-1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(100, 600, 100);
    this.camera.lookAt(150, 0, 200);
    this.camera.rotation.z = 0;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(Config.Background.Color);

    //Helpers.addAxes(this.scene);
    this.scene.add(...Helpers.getBox({ boardWidthPx, boardHeightPx }));

    //point light
    this.light = new THREE.PointLight(0xffffff, 1, 1000);
    // var sphere = new THREE.SphereBufferGeometry(5, 16, 8);
    // light.add(
    //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
    // );
    this.light.position.set(
      Config.PointLightInitialValues.x,
      Config.PointLightInitialValues.y,
      Config.PointLightInitialValues.z,
    );
    this.light.castShadow = true;
    this.scene.add(this.light);

    //ambient light
    const amlight = new THREE.AmbientLight(Config.AmbientLight.Color);
    this.scene.add(amlight);

    // score exture
    const scoreCanvas = document.getElementById(
      "score-canvas"
    ) as HTMLCanvasElement;
    scoreCanvas.width = ScoreCanvas.width;
    scoreCanvas.height = ScoreCanvas.height;
    this.scoreCanvasContext = scoreCanvas.getContext("2d");
    this.scoreCanvasContext.font = ScoreCanvas.font;
    this._updateScoreTexture();

    // score block
    const scoreMat = new THREE.MeshBasicMaterial({ transparent: true });
    const scoreG = new THREE.BoxGeometry(128, 1, 64);
    const scoreMesh = new THREE.Mesh(scoreG, scoreMat);
    scoreMesh.position.set(-70, 0, 200);
    this.scene.add(scoreMesh);
    scoreMat.map = new THREE.CanvasTexture(scoreCanvas);
    this.scoreMaterial = scoreMat;

    this.previousScore = this.store.getState().score;

    // add development GUI
    if(this.isDevelopment) {
      this.devPanel = new DevPanel();
    }
  }

  start() {
    animationFrames()
      .pipe(
        pairwise(),
        map(([prev, current]) => current.elapsed - prev.elapsed)
      )
      .subscribe(delta_ms => this._renderFrame(delta_ms))
      
    // press "s" to chake camera for testing purposes
    document.addEventListener("keydown", e => {
      if (e.key === "s") {
        this.isShaking = true;
        this.shakingProgressPrecents = 0;
      }
    })
  }

  private _renderFrame(frameTimeDeltaMs: number) {
    const { currentFigure, nextFigure, board, score } = this.store.getState();

    const blockMeshes = this.scene.children
      .filter(x => x instanceof THREE.Mesh &&  x.name === "blockBody");

    const stateBlocks = [
      ...currentFigure.blocks,
      ...nextFigure.blocks,
      ...board.fragments,
    ];

    // render newly added blobks
    const blocksToRender = stateBlocks.filter(x => {
      const isAlreadyRendered = blockMeshes.some(m => m.userData.blockId === x.id);
      return !isAlreadyRendered;
    });
    blocksToRender.forEach(b => {
      Helpers.addBlock({ scene: this.scene, block: b });
    });

    // move existing blocks that should be moved AND remove deleted blocks 
    for(const mesh of blockMeshes) {
      // find related block in game state
      const stateBlock = stateBlocks.find(x => x.id === mesh.userData.blockId);
      if(stateBlock){
        const shouldHaveCoords = calculateBlockCoords(stateBlock);
        const isCoordsMatch  = shouldHaveCoords.x === mesh.position.x 
          && shouldHaveCoords.y === mesh.position.y 
          && shouldHaveCoords.z === mesh.position.z;

        // apply new coords if needed
        if(!isCoordsMatch) {
            mesh.position.x = shouldHaveCoords.x;
            mesh.position.y = shouldHaveCoords.y;
            mesh.position.z = shouldHaveCoords.z;
          }
      } else {
        // remove
        this.scene.remove(mesh);
        (mesh as THREE.Mesh).geometry.dispose();
        // TODO improve typing
        ((mesh as THREE.Mesh)?.material as THREE.Material)?.dispose();
      }
    }

    this._updateScoreTexture();
    this.scoreMaterial.map.needsUpdate = true;

    // react on a new score
    if (score !== this.previousScore) {
      this.previousScore = score;
      this.isShaking = true;
      this.shakingProgressPrecents = 0;
    }

    if (this.isShaking) {
      this._shakeCamera(frameTimeDeltaMs);
    }

    if(this.isDevelopment) {
      this.light.position.set(
        this.devPanel.params.pointLightX, 
        this.devPanel.params.pointLightY, 
        this.devPanel.params.pointLightZ
      )
    }

    this.renderer.render(this.scene, this.camera);
  }

  private _shakeCamera(frameTimeDeltaMs: number) {
    const stepMs = 50;
    const fullDiration = 2 * stepMs;
    const angleMaxDeviationDeg = 10;
    const shakingDuraionMs = this.shakingProgressPrecents / 100 * fullDiration + frameTimeDeltaMs;
    let cameraAngleDeg;
    if (shakingDuraionMs < fullDiration) {
      cameraAngleDeg = angleMaxDeviationDeg * Math.sin(shakingDuraionMs * Math.PI / stepMs);
      this.shakingProgressPrecents = shakingDuraionMs / fullDiration * 100;
    } else {
      cameraAngleDeg = 0;
      this.isShaking = false;
      this.shakingProgressPrecents = null;
    }
    const cameraAngleRad = Helpers.degToRad(cameraAngleDeg)
    this.camera.rotation.z = cameraAngleRad;
  }

  private _updateScoreTexture() {
    const { score } = this.store.getState();
    this.scoreCanvasContext.clearRect(
      0,
      0,
      this.scoreCanvasContext.canvas.width,
      this.scoreCanvasContext.canvas.height
    );
    this.scoreCanvasContext.fillStyle = ScoreCanvas.fontColor;
    this.scoreCanvasContext.fillText(
      score.toString(),
      ScoreCanvas.fontX,
      ScoreCanvas.fontY
    );
  }
}

