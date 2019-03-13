import * as THREE from "three";

const AXIS_X_COLOR = 0xff0000;
const AXIS_Y_COLOR = 0x00ff00;
const AXIS_Z_COLOR = 0x0000ff;

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
