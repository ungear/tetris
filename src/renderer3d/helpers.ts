import * as THREE from "three";
import { Block } from "../../typing/block";
import * as Config from "./config";

const AXIS_X_COLOR = 0xff0000;
const AXIS_Y_COLOR = 0x00ff00;
const AXIS_Z_COLOR = 0x0000ff;
const BOX_COLOR = 0x5e98f5;

export function addAxes(scene: THREE.Scene, length = 30) {
  var materialX = new THREE.LineBasicMaterial({ color: AXIS_X_COLOR });
  var geometryX = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(length, 0, 0)
  ]);
  var xAxis = new THREE.Line(geometryX, materialX);
  xAxis.name = "xAxis";

  var materialY = new THREE.LineBasicMaterial({ color: AXIS_Y_COLOR });
  var geometryY = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, length, 0)
  ]);
  var yAxis = new THREE.Line(geometryY, materialY);
  yAxis.name = "yAxis";

  var materialZ = new THREE.LineBasicMaterial({ color: AXIS_Z_COLOR });
  var geometryZ =  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, length)
  ]);
  var zAxis = new THREE.Line(geometryZ, materialZ);
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
  var boxMaterial = new THREE.MeshPhongMaterial({
    color: BOX_COLOR
  });

  var backG = new THREE.BoxGeometry(boardWidthPx, 1, boardHeightPx);
  var back = new THREE.Mesh(backG, boxMaterial);
  back.position.set(boardWidthPx / 2, 0, boardHeightPx / 2);

  var leftG = new THREE.BoxGeometry(1, Config.Block.Size, boardHeightPx);
  var left = new THREE.Mesh(leftG, boxMaterial);
  left.position.set(0, Config.Block.Size / 2, boardHeightPx / 2);

  var rightG = new THREE.BoxGeometry(1, Config.Block.Size, boardHeightPx);
  var right = new THREE.Mesh(rightG, boxMaterial);
  right.position.set(boardWidthPx, Config.Block.Size / 2, boardHeightPx / 2);

  var bottomG = new THREE.BoxGeometry(boardWidthPx, Config.Block.Size, 1);
  var bottom = new THREE.Mesh(bottomG, boxMaterial);
  bottom.position.set(boardWidthPx / 2, Config.Block.Size / 2, boardHeightPx);

  var sides = [back, left, right, bottom];
  sides.forEach(x => (x.receiveShadow = true));
  return sides;
}

export function addBlock({
  scene,
  block
}: {
  scene: THREE.Scene;
  block: Block;
}) {
  var blockGeometry = new THREE.BoxGeometry(
    Config.Block.Size - 2,
    Config.Block.Size - 2,
    Config.Block.Size - 2
  );
  var blockMaterial = new THREE.MeshStandardMaterial({
    color: block.color
  });

  var body = new THREE.Mesh(blockGeometry, blockMaterial);
  body.position.x = block.x * Config.Block.Size + Config.Block.Size / 2;
  body.position.y = Config.Block.Size / 2;
  body.position.z = block.y * Config.Block.Size + Config.Block.Size / 2;
  body.name = "blockBody";
  body.castShadow = true;
  body.receiveShadow = true;
  scene.add(body);
}

export function degToRad(degrees: number): number {
  return degrees * Math.PI / 180;
}