import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { UserAction, getUserActionByKey } from "./userAction";
import { interval, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import {
  getBoardFragmentByCoords,
  getNewShape,
  isShapeLandedOnFragment,
  isShapeLandedOnBottom,
  moveShapeDown,
  moveShapeLeft,
  moveShapeRight
} from "./logic";

const FALLING_INTERVAL_MS = 500;

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

var game: Game = {
  shape: getNewShape(board.width),
  board
};

const falling$ = interval(FALLING_INTERVAL_MS);
falling$.subscribe(_ => {
  if (isShapeLandedOnFragment(game) || isShapeLandedOnBottom(game)) {
    //add shape to fragments
    game.shape.blocks.forEach(b => game.board.fragments.push(b));

    //check defeat (y coord of any fragment === 0)
    //TODO

    //calculate row to destroy
    //TODO

    //new shape
    game.shape = getNewShape(game.board.width);
  } else {
    moveShapeDown(game.shape);
  }
});

const keyboard$ = fromEvent(document, "keydown");
keyboard$
  .pipe(
    map((e: KeyboardEvent) => getUserActionByKey(e.key)),
    filter((ua: UserAction) => !!ua)
  )
  .subscribe((ua: UserAction) => {
    switch (ua) {
      case UserAction.Left:
        moveShapeLeft(game);
        break;
      case UserAction.Right:
        moveShapeRight(game);
        break;
    }
  });

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
