import { Game } from "../../typing/game";
import { Block } from "../../typing/block";
import { Store } from "redux";
import * as THREE from "three";
import * as Helpers from "./helpers";
import * as Config from "./config";

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
  constructor(store: Store<Game>) {
    this.store = store;
    const { board } = this.store.getState();
    const boardWidthPx = Config.Block.Size * board.width;
    const boardHeightPx = Config.Block.Size * board.height;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(150, 800, 200);
    this.camera.lookAt(150, 0, 200);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x888888);

    //Helpers.addAxes(this.scene);
    this.scene.add(...Helpers.getBox({ boardWidthPx, boardHeightPx }));

    //point light
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    // var sphere = new THREE.SphereBufferGeometry(5, 16, 8);
    // light.add(
    //   new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }))
    // );
    light.position.set(300, 200, 100);
    light.castShadow = true;
    this.scene.add(light);

    //ambient light
    var amlight = new THREE.AmbientLight(0x888888); // soft white light
    this.scene.add(amlight);

    // score exture
    var scoreCanvas = document.getElementById(
      "score-canvas"
    ) as HTMLCanvasElement;
    scoreCanvas.width = ScoreCanvas.width;
    scoreCanvas.height = ScoreCanvas.height;
    this.scoreCanvasContext = scoreCanvas.getContext("2d");
    this.scoreCanvasContext.font = ScoreCanvas.font;
    this._updateScoreTexture();

    // score block
    var scoreMat = new THREE.MeshBasicMaterial({ transparent: true });
    var scoreG = new THREE.BoxGeometry(128, 1, 64);
    var scoreMesh = new THREE.Mesh(scoreG, scoreMat);
    scoreMesh.position.set(-70, 0, 200);
    this.scene.add(scoreMesh);
    scoreMat.map = new THREE.CanvasTexture(scoreCanvas);
    this.scoreMaterial = scoreMat;

    this.previousScore = this.store.getState().score;
  }

  start() {
    var previousFrameTimestamp = 0;
    var animate = (timeStamp: number) => {
      requestAnimationFrame(animate);
      this._renderFrame(timeStamp - previousFrameTimestamp);
      previousFrameTimestamp = timeStamp;
    };

    animate(previousFrameTimestamp);

    // press "s" to chake camera for testing purposes
    document.addEventListener("keydown", e => {
      if (e.key === "s") {
        this.isShaking = true;
        this.shakingProgressPrecents = 0;
      }
    })
  }

  private _renderFrame(frameTimeDeltaMs: number) {
    let { figuresSet, board, score } = this.store.getState();
    // remove all existing blocks
    this.scene.children
      .filter(x => x.name === "blockBody")
      .forEach(x => {
        this.scene.remove(x);
        (x as THREE.Mesh).geometry.dispose();
      });

    // redraw figure and fragments
    figuresSet.current.blocks.concat(board.fragments).forEach(b => {
      Helpers.addBlock({ scene: this.scene, block: b });
    });
    figuresSet.next.blocks.forEach(b => {
      let blockClone = { ...b, x: b.x - board.width / 2 - 3 };
      Helpers.addBlock({ scene: this.scene, block: blockClone });
    });

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

    this.renderer.render(this.scene, this.camera);
  }

  private _shakeCamera(frameTimeDeltaMs: number) {
    const stepMs = 50;
    const fullDiration = 2 * stepMs;
    const angleMaxDeviationDeg = 10;
    let shakingDuraionMs = this.shakingProgressPrecents / 100 * fullDiration + frameTimeDeltaMs;
    let cameraAngleDeg;
    if (shakingDuraionMs < fullDiration) {
      cameraAngleDeg = angleMaxDeviationDeg * Math.sin(shakingDuraionMs * Math.PI / stepMs);
      this.shakingProgressPrecents = shakingDuraionMs / fullDiration * 100;
    } else {
      cameraAngleDeg = 0;
      this.isShaking = false;
      this.shakingProgressPrecents = null;
    }
    let cameraAngleRad = Helpers.degToRad(cameraAngleDeg)
    this.camera.rotation.z = cameraAngleRad;
  }

  private _updateScoreTexture() {
    let { score } = this.store.getState();
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
