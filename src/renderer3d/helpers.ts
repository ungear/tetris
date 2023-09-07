import * as THREE from "three";
import { Block } from "../../typing/block";
import * as Config from "./config";

const AXIS_X_COLOR = 0xff0000;
const AXIS_Y_COLOR = 0x00ff00;
const AXIS_Z_COLOR = 0x0000ff;
const BOX_COLOR = 0x5e98f5;

export function addAxes(scene: THREE.Scene, length = 30) {
  const materialX = new THREE.LineBasicMaterial({ color: AXIS_X_COLOR });
  const geometryX = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(length, 0, 0)
  ]);
  const xAxis = new THREE.Line(geometryX, materialX);
  xAxis.name = "xAxis";

  const materialY = new THREE.LineBasicMaterial({ color: AXIS_Y_COLOR });
  const geometryY = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, length, 0)
  ]);
  const yAxis = new THREE.Line(geometryY, materialY);
  yAxis.name = "yAxis";

  const materialZ = new THREE.LineBasicMaterial({ color: AXIS_Z_COLOR });
  const geometryZ =  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, length)
  ]);
  const zAxis = new THREE.Line(geometryZ, materialZ);
  zAxis.name = "zAxis";

  scene.add(xAxis);
  scene.add(yAxis);
  scene.add(zAxis);
}

export function getBox({
  boardWidthPx,
  boardHeightPx
}: {
  boardWidthPx: number;
  boardHeightPx: number;
}): THREE.Mesh[] {
  // create a texture loader.
  // const textureLoader = new THREE.TextureLoader();

  // // load a texture
  // const texture = textureLoader.load(
  //   '/uv-test-bw.png',
  // );
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // //texture.repeat.set( 4, 4 );

  const boxMaterial = new THREE.MeshPhongMaterial({
    color: BOX_COLOR
    //map: texture
  });

  const backG = new THREE.BoxGeometry(boardWidthPx, 1, boardHeightPx);
  //const backTexture = new THREE.TextureLoader().load('/uv-test-bw.png');
  const backTexture = new THREE.TextureLoader().load('/lava.jpg');
  backTexture.wrapS = THREE.RepeatWrapping;
  backTexture.wrapT = THREE.RepeatWrapping;
  // backTexture.repeat.set( boardWidthPx/10, boardHeightPx/10 );
  const backMaterial = new THREE.MeshStandardMaterial({
    map: backTexture
    //color: BOX_COLOR
  });
  const back = new THREE.Mesh(backG, backMaterial);
  back.position.set(boardWidthPx / 2, 0, boardHeightPx / 2);

  const leftG = new THREE.BoxGeometry(1, Config.Block.Size, boardHeightPx);
  const left = new THREE.Mesh(leftG, boxMaterial);
  left.position.set(0, Config.Block.Size / 2, boardHeightPx / 2);

  const rightG = new THREE.BoxGeometry(1, Config.Block.Size, boardHeightPx);
  const right = new THREE.Mesh(rightG, boxMaterial);
  right.position.set(boardWidthPx, Config.Block.Size / 2, boardHeightPx / 2);

  const bottomG = new THREE.BoxGeometry(boardWidthPx, Config.Block.Size, 1);
  const bottom = new THREE.Mesh(bottomG, boxMaterial);
  bottom.position.set(boardWidthPx / 2, Config.Block.Size / 2, boardHeightPx);

  const sides = [back, left, right, bottom];
  sides.forEach(x => (x.receiveShadow = true));
  return sides;
}

export function calculateBlockCoords(block: Block){
  return {
    x : block.x * Config.Block.Size + Config.Block.Size / 2,
    y : Config.Block.Size / 2,
    z : block.y * Config.Block.Size + Config.Block.Size / 2,
  }
}

export function addBlock({
  scene,
  block
}: {
  scene: THREE.Scene;
  block: Block;
}) {
  const blockGeometry = new THREE.BoxGeometry(
    Config.Block.Size - Config.Block.Padding,
    Config.Block.Size - Config.Block.Padding,
    Config.Block.Size - Config.Block.Padding
  );
  const blockMaterial = new THREE.MeshStandardMaterial({
    color: block.color
  });

  const body = new THREE.Mesh(blockGeometry, blockMaterial);
  const coords = calculateBlockCoords(block);
  body.position.x = coords.x;
  body.position.y = coords.y;
  body.position.z = coords.z;
  body.name = "blockBody";
  body.userData = { 
    blockId: block.id
  };
  body.castShadow = true;
  body.receiveShadow = true;

  const edgesGeometry = new THREE.EdgesGeometry( blockGeometry );
  const edgeColor = new THREE.Color(block.color)
    .multiplyScalar(Config.Block.EdgeColorMultiplier);
  const edgesMaterial = new THREE.LineBasicMaterial( { color: edgeColor}); 
  const edges = new THREE.LineSegments( edgesGeometry, edgesMaterial);
  body.add(edges)
  scene.add(body);
}

export function degToRad(degrees: number): number {
  return degrees * Math.PI / 180;
}