import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { interval } from "rxjs";

const FALLING_INTERVAL_MS = 1000;

var board: Board = { width: 10, height: 20, fragments: [] };

// create board
var target = document.getElementById("target");
for (let rowIndex = 0; rowIndex < board.height; rowIndex++) {
  for (let colIndex = 0; colIndex < board.width; colIndex++) {
    var cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.y = rowIndex.toString();
    cellEl.dataset.x = colIndex.toString();
    target.appendChild(cellEl);
  }
}

// add test shape
var shape: Shape = {
  form: ShapeForm.Square,
  blocks: [{ x: 1, y: 6 }, { x: 2, y: 6 }, { x: 1, y: 7 }, { x: 2, y: 7 }]
};

var game: Game = {
  shape,
  board
};

const falling$ = interval(FALLING_INTERVAL_MS);
falling$.subscribe(_ => {
  if (isShapeLandedOnFragment(game) || isShapeLandedOnBottom(game)) {
    //add shape to fragments
    //calculate row to destroy
    //new shape
  } else {
    moveShapeDown(game.shape);
  }
});

function moveShapeDown(shape: Shape) {
  shape.blocks.forEach(b => b.y++);
}

function isShapeLandedOnFragment(game: Game): boolean {
  //number of blocks which is right above any board's fragment
  return (
    shape.blocks.filter(
      b => !!getBoardFragmentByCoords({ board: game.board, x: b.x + 1, y: b.y })
    ).length > 0
  );
}

function isShapeLandedOnBottom(game: Game): boolean {
  return shape.blocks.some(b => b.y === game.board.height - 1);
}

function getBoardFragmentByCoords({
  board,
  x,
  y
}: {
  board: Board;
  x: number;
  y: number;
}): Block {
  return board.fragments.find(b => b.x === x && b.y === y);
}
var animate = function() {
  requestAnimationFrame(animate);
  Array.from(document.querySelectorAll(".cell"))
    .map(el => ({
      el,
      canvasBlock: getCanvasBlockByEl(game, el as HTMLElement)
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

function getCanvasBlockByEl(game: Game, el: HTMLElement): Block {
  let boardBlock = game.board.fragments.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
  let shapeBlock = game.shape.blocks.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
  return boardBlock || shapeBlock;
}
