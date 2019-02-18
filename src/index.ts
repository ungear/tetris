import { Block, BlockIO } from "../typing/block";
import { Board } from "../typing/board";

var board: Board = { width: 10, height: 20, blocks: [] };
var testBlock: Block = { x: 3, y: 5 };
board.blocks.push(testBlock);

// create board
var target = document.getElementById("target");
for (let rowIndex = 0; rowIndex < board.height; rowIndex++) {
  for (let colIndex = 0; colIndex < board.width; colIndex++) {
    var cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.x = rowIndex.toString();
    cellEl.dataset.y = colIndex.toString();
    target.appendChild(cellEl)
  }
}

var animate = function () {
  requestAnimationFrame(animate);
  Array
    .from(document.querySelectorAll(".cell"))
    .map(el => ({
      el,
      canvasBlock: getCanvasBlockByEl(board, el as HTMLElement)
    }))
    .forEach(x => {
      if (x.canvasBlock) {
        x.el.classList.add("block")
      } else {
        x.el.classList.remove("block")
      }

    })
};

animate();

function getCanvasBlockByEl(board: Board, el: HTMLElement): Block {
  return board.blocks.find(b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y)
}