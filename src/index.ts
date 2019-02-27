import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
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
  moveShapeRight,
  getYcoordsOfFullRows,
  handleCompletedRows
} from "./logic";
import { RendererDom } from "./rendererDom";

const FALLING_INTERVAL_MS = 500;

var board: Board = { width: 8, height: 10, fragments: [] };

var game: Game = {
  figure: getNewShape(board.width),
  board,
  isOver: false,
  score: 0
};

const falling$ = interval(FALLING_INTERVAL_MS);
const fallingSubscription = falling$.subscribe(_ => {
  if (isShapeLandedOnFragment(game) || isShapeLandedOnBottom(game)) {
    //add shape to fragments
    game.figure.blocks.forEach(b => game.board.fragments.push(b));

    //check defeat
    let gameIsOver = game.board.fragments.some(b => b.y === 0);
    if (gameIsOver) {
      game.isOver = true;
      fallingSubscription.unsubscribe();
      return;
    }

    //calculate row to destroy
    let fullRowsCoords = getYcoordsOfFullRows(game.board);
    if (fullRowsCoords.length) {
      handleCompletedRows(board, fullRowsCoords);
      game.score = game.score + fullRowsCoords.length;
    }
    //new shape
    game.figure = getNewShape(game.board.width);
  } else {
    moveShapeDown(game);
  }
});

const keyboard$ = fromEvent(document, "keydown");
keyboard$
  .pipe(
    map((e: KeyboardEvent) => getUserActionByKey(e.key)),
    filter((ua: UserAction) => !!ua)
  )
  .subscribe((ua: UserAction) => {
    // To rotate clockwise (θ = -90 deg ):
    // x' = x cos θ − y sin θ
    // y' = x sin θ + y cos θ
    switch (ua) {
      case UserAction.Left:
        moveShapeLeft(game);
        break;
      case UserAction.Right:
        moveShapeRight(game);
        break;
      case UserAction.Down:
        moveShapeDown(game);
        break;
    }
  });

var renderer = new RendererDom();
renderer.initialize(game);
renderer.start(game);
