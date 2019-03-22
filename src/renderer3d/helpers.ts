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
    Config.Block.Size - 2,
    Config.Block.Size - 2,
    Config.Block.Size - 2
  );
  var blockMaterial = new THREE.MeshStandardMaterial({
    color: Config.Block.BodyColor
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
