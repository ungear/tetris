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
    this.camera.position.set(150, 400, 200);
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
    light.position.set(200, 200, 100);
    light.castShadow = true;
    this.scene.add(light);

    //ambient light
    var amlight = new THREE.AmbientLight(0x888888); // soft white light
    this.scene.add(amlight);
  }

  start() {
    this.renderer.render(this.scene, this.camera);
    this.store.subscribe(() => {
      let { figure, board } = this.store.getState();

      // remove all existing blocks
      this.scene.children
        .filter(x => x.name === "blockBody")
        .forEach(x => this.scene.remove(x));

      // redraw figure and fragments
      figure.blocks.concat(board.fragments).forEach(b => {
        Helpers.addBlock({ scene: this.scene, block: b });
      });
      this.renderer.render(this.scene, this.camera);
    });

    // var angle = 0;
    // var radius = 100;
    // var animate = () => {
    //   requestAnimationFrame(animate);

    //   this.camera.position.x = radius * Math.cos(angle);
    //   this.camera.position.z = radius * Math.sin(angle);
    //   this.camera.lookAt(50, 50, 0);
    //   angle += 0.01;

    //   this.renderer.render(this.scene, this.camera);
    // };

    // animate();
  }
}
