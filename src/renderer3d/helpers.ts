import * as THREE from "three";
import { Block } from "../../typing/block";

const AXIS_X_COLOR = 0xff0000;
const AXIS_Y_COLOR = 0x00ff00;
const AXIS_Z_COLOR = 0x0000ff;
const BOX_COLOR = 0xffffff;
const BLOCK = {
  SIZE: 10,
  BORDER_COLOR: 0x0000ff,
  BODY_COLOR: 0xaaaa00
};

export function addAxes(scene: THREE.Scene, length = 30) {
  var materialX = new THREE.LineBasicMaterial({ color: AXIS_X_COLOR });
  var geometryX = new THREE.Geometry();
  geometryX.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryX.vertices.push(new THREE.Vector3(length, 0, 0));
  var xAxis = new THREE.Line(geometryX, materialX);

  var materialY = new THREE.LineBasicMaterial({ color: AXIS_Y_COLOR });
  var geometryY = new THREE.Geometry();
  geometryY.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryY.vertices.push(new THREE.Vector3(0, length, 0));
  var yAxis = new THREE.Line(geometryY, materialY);

  var materialZ = new THREE.LineBasicMaterial({ color: AXIS_Z_COLOR });
  var geometryZ = new THREE.Geometry();
  geometryZ.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryZ.vertices.push(new THREE.Vector3(0, 0, length));
  var zAxis = new THREE.Line(geometryZ, materialZ);

  scene.add(xAxis);
  scene.add(yAxis);
  scene.add(zAxis);
}

export function addBox(scene: THREE.Scene) {
  var bodyGeometry = new THREE.BoxGeometry(100, 100, 10);
  var edge = new THREE.EdgesGeometry(bodyGeometry);
  var line = new THREE.LineSegments(
    edge,
    new THREE.LineBasicMaterial({ color: BOX_COLOR })
  );
  line.position.x = 50;
  line.position.y = 50;
  line.position.z = 5;
  scene.add(line);
}

export function addBlock({
  scene,
  block
}: {
  scene: THREE.Scene;
  block: Block;
}) {
  var blockGeometry = new THREE.BoxGeometry(BLOCK.SIZE, BLOCK.SIZE, BLOCK.SIZE);
  var blockMaterial = new THREE.MeshBasicMaterial({ color: BLOCK.BODY_COLOR });
  var body = new THREE.Mesh(blockGeometry, blockMaterial);
  body.position.x = block.x * BLOCK.SIZE + BLOCK.SIZE / 2;
  body.position.y = block.y * BLOCK.SIZE + BLOCK.SIZE / 2;
  body.position.z = BLOCK.SIZE / 2;
  //body.castShadow = true;
  scene.add(body);

  var edge = new THREE.EdgesGeometry(blockGeometry);
  var line = new THREE.LineSegments(
    edge,
    new THREE.LineBasicMaterial({ color: BLOCK.BORDER_COLOR })
  );
  line.position.x = body.position.x;
  line.position.y = body.position.y;
  line.position.z = body.position.z;
  scene.add(line);
}

// export function addBox({ box, scene }) {
//   var bodyGeometry = new THREE.BoxGeometry(box.w, box.h, box.d);
//   var bodyMaterial = new THREE.MeshStandardMaterial({ color: box.boxColor });
//   var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//   body.position.x = box.x;
//   body.position.y = box.y;
//   body.position.z = box.z;
//   body.castShadow = true;
//   scene.add(body);

//   //var cageGeometry = new THREE.BoxBufferGeometry(box.w, box.h, box.d);
//   var edge = new THREE.EdgesGeometry(bodyGeometry);
//   var line = new THREE.LineSegments(
//     edge,
//     new THREE.LineBasicMaterial({ color: box.cageColor })
//   );
//   line.position.x = box.x;
//   line.position.y = box.y;
//   line.position.z = box.z;
//   scene.add(line);
// }
