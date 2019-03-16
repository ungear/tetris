import { Game } from "../../typing/game";
import { Block } from "../../typing/block";
import { Store } from "redux";
import * as THREE from "three";
import * as Helpers from "./helpers";
import * as Config from "./config";

export class Renderer3d {
  store: Store<Game>;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;

  constructor(store: Store<Game>) {
    this.store = store;
    const { board } = this.store.getState();
    const boardWidthPx = Config.Block.Size * board.width;
    const boardHeightPx = Config.Block.Size * board.height;
    const gameWidth = boardWidthPx + 100;
    const gameHeight = boardHeightPx + 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(500, 500);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 1000);
    this.camera.position.x = 150;
    this.camera.position.y = 400;
    this.camera.position.z = 200;
    this.camera.lookAt(150, 0, 200);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x888888);

    Helpers.addAxes(this.scene);
    // Helpers.addBox(this.scene);
    // Helpers.addBlock({ scene: this.scene, block: { x: 0, y: 0 } });

    var bodyGeometry = new THREE.BoxGeometry(
      boardWidthPx,
      Config.Block.Size,
      boardHeightPx
    );
    var edge = new THREE.EdgesGeometry(bodyGeometry);
    var line = new THREE.LineSegments(
      edge,
      new THREE.LineBasicMaterial({ color: Config.Box.Color })
    );
    line.position.x = boardWidthPx / 2;
    line.position.y = Config.Block.Size / 2;
    line.position.z = boardHeightPx / 2;
    this.scene.add(line);

    // for (let rowIndex = 0; rowIndex < board.height; rowIndex++) {
    //   for (let colIndex = 0; colIndex < board.width; colIndex++) {
    //     var cellEl = document.createElement("div");
    //     cellEl.classList.add("cell");
    //     cellEl.dataset.y = rowIndex.toString();
    //     cellEl.dataset.x = colIndex.toString();
    //     this.target.appendChild(cellEl);
    //   }
    // }
  }

  start() {
    this.renderer.render(this.scene, this.camera);
    this.store.subscribe(() => {
      let { figure, board } = this.store.getState();
      figure.blocks.forEach(b => {
        Helpers.addBlock({ scene: this.scene, block: b });
      });
      this.renderer.render(this.scene, this.camera);
    });

    // var angle = 0;
    // var radius = 100;
    // var animate = () => {
    //   requestAnimationFrame(animate);

    //   // this.camera.position.x = radius * Math.cos(angle);
    //   // this.camera.position.z = radius * Math.sin(angle);
    //   // this.camera.lookAt(50, 50, 0);
    //   // angle += 0.01;

    //   this.renderer.render(this.scene, this.camera);
    // };

    // animate();
  }
}
