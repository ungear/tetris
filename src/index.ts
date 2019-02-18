import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";

var board: Board = { width: 10, height: 20, blocks: [] };

// create board
var target = document.getElementById("target");
for (let rowIndex = 0; rowIndex < board.height; rowIndex++) {
  for (let colIndex = 0; colIndex < board.width; colIndex++) {
    var cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.x = rowIndex.toString();
    cellEl.dataset.y = colIndex.toString();
    target.appendChild(cellEl);
  }
}

// add test shape
var shape: Shape = {
  form: ShapeForm.Square,
  blocks: [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 6, y: 7 }, { x: 7, y: 7 }]
};
shape.blocks.forEach(b => board.blocks.push(b));

var animate = function() {
  requestAnimationFrame(animate);
  Array.from(document.querySelectorAll(".cell"))
    .map(el => ({
      el,
      canvasBlock: getCanvasBlockByEl(board, el as HTMLElement)
    }))
    .forEach(x => {
      if (x.canvasBlock) {
        x.el.classList.add("block");
      } else {
        x.el.classList.remove("block");
      }
    });
};

animate();

function getCanvasBlockByEl(board: Board, el: HTMLElement): Block {
  return board.blocks.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
}
