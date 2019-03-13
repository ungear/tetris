import { Game } from "../../typing/game";
import { Block } from "../../typing/block";
import { Store } from "redux";
import * as THREE from "three";
import { addAxes, addBox } from "./helpers";

const GAME_WIDTH_PX = 600;
const GAME_HEIGHT_PX = 700;

export class Renderer3d {
  store: Store<Game>;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;

  initialize(store: Store<Game>) {
    this.store = store;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(GAME_WIDTH_PX, GAME_HEIGHT_PX);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.x = 50;
    this.camera.position.y = 50;
    this.camera.position.z = 100;
    this.camera.lookAt(50, 50, 0);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x888888);

    addAxes(this.scene);
    addBox(this.scene);

    let { board } = this.store.getState();
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
    var animate = () => {
      requestAnimationFrame(animate);

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
