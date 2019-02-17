import { Block, BlockIO } from "../typing/block";

let b: Block = { x: 1, y: 2 };
let x = BlockIO.decode(JSON.parse('{"x":1,"y":1}'));
let y = BlockIO.decode(JSON.parse('{"x":1,"y":"1"}'));
console.log(y.isLeft());
alert(1);
