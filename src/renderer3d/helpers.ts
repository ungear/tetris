import * as THREE from "three";
import { Block } from "../../typing/block";
import * as Config from "./config";

const AXIS_X_COLOR = 0xff0000;
const AXIS_Y_COLOR = 0x00ff00;
const AXIS_Z_COLOR = 0x0000ff;
const BOX_COLOR = 0xffffff;

export function addAxes(scene: THREE.Scene, length = 30) {
  var materialX = new THREE.LineBasicMaterial({ color: AXIS_X_COLOR });
  var geometryX = new THREE.Geometry();
  geometryX.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryX.vertices.push(new THREE.Vector3(length, 0, 0));
  var xAxis = new THREE.Line(geometryX, materialX);
  xAxis.name = "xAxis";

  var materialY = new THREE.LineBasicMaterial({ color: AXIS_Y_COLOR });
  var geometryY = new THREE.Geometry();
  geometryY.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryY.vertices.push(new THREE.Vector3(0, length, 0));
  var yAxis = new THREE.Line(geometryY, materialY);
  yAxis.name = "yAxis";

  var materialZ = new THREE.LineBasicMaterial({ color: AXIS_Z_COLOR });
  var geometryZ = new THREE.Geometry();
  geometryZ.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryZ.vertices.push(new THREE.Vector3(0, 0, length));
  var zAxis = new THREE.Line(geometryZ, materialZ);
  zAxis.name = "zAxis";

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
  var blockGeometry = new THREE.BoxGeometry(
    Config.Block.Size,
    Config.Block.Size,
    Config.Block.Size
  );
  var blockMaterial = new THREE.MeshStandardMaterial({
    color: Config.Block.BodyColor
  });
  var body = new THREE.Mesh(blockGeometry, blockMaterial);
  body.position.x = block.x * Config.Block.Size + Config.Block.Size / 2;
  body.position.y = Config.Block.Size / 2;
  body.position.z = block.y * Config.Block.Size + Config.Block.Size / 2;
  body.name = "blockBody";
  body.renderOrder = 100;
  body.castShadow = true;
  body.receiveShadow = true;
  scene.add(body);

  var edge = new THREE.EdgesGeometry(blockGeometry);
  var line = new THREE.LineSegments(
    edge,
    new THREE.LineBasicMaterial({ color: Config.Block.BorderColor })
  );
  line.position.x = body.position.x;
  line.position.y = body.position.y;
  line.position.z = body.position.z;
  line.name = "blockBorder";
  line.renderOrder = body.renderOrder + 1;
  // to ensure that borders will not be hidden by bodies
  line.onBeforeRender = function(renderer) {
    renderer.clearDepth();
  };
  scene.add(line);

  return;
  // alternative way of drawing edges
  var h = Config.Block.Size / 2;
  var bpx = body.position.x;
  var bpy = body.position.y;
  var bpz = body.position.z;
  var blockBorderMaterial = new THREE.LineBasicMaterial({
    color: Config.Block.BorderColor
  });
  var blockBorderGeometry = new THREE.Geometry();
  var a1 = new THREE.Vector3(bpx - h, bpy + h, bpz - h);
  var a2 = new THREE.Vector3(bpx + h, bpy + h, bpz - h);
  var a3 = new THREE.Vector3(bpx + h, bpy + h, bpz + h);
  var a4 = new THREE.Vector3(bpx - h, bpy + h, bpz + h);
  var b1 = new THREE.Vector3(bpx - h, bpy - h, bpz - h);
  var b2 = new THREE.Vector3(bpx + h, bpy - h, bpz - h);
  var b3 = new THREE.Vector3(bpx + h, bpy - h, bpz + h);
  var b4 = new THREE.Vector3(bpx - h, bpy - h, bpz + h);
  blockBorderGeometry.vertices.push(
    a1,
    a2,
    a3,
    a4,
    a1,
    b1,
    b2,
    b3,
    b4,
    b1,
    b4,
    a4,
    a3,
    b3,
    b2,
    a2
  );
  var blockBorderLine = new THREE.Line(
    blockBorderGeometry,
    blockBorderMaterial
  );
  blockBorderLine.name = "blockBorder";
  scene.add(blockBorderLine);
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
