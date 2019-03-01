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
import { createStore } from "redux";
import { app } from "./store/app";
import * as actions from "./store/actions";
import { GameState } from "./store/types";

const FALLING_INTERVAL_MS = 500;
const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 10;

let f = getNewShape(BOARD_WIDTH);

const initialState: GameState = {
  score: 0,
  figure: getNewShape(BOARD_WIDTH)
};
const store = createStore(app, initialState);

var board: Board = { width: BOARD_WIDTH, height: BOARD_HEIGHT, fragments: [] };

var game: Game = {
  figure: f,
  board,
  isOver: false
};

const falling$ = interval(FALLING_INTERVAL_MS);
const fallingSubscription = falling$.subscribe(_ => {
  if (isShapeLandedOnFragment(game) || isShapeLandedOnBottom(game)) {
    //add shape to fragments
    game.figure.blocks.forEach(b => game.board.fragments.push(b));

    //calculate row to destroy
    let fullRowsCoords = getYcoordsOfFullRows(game.board);
    if (fullRowsCoords.length) {
      handleCompletedRows(board, fullRowsCoords);

      store.dispatch(actions.scoreAdd(fullRowsCoords.length));
    }

    //check defeat
    let gameIsOver = game.board.fragments.some(b => b.y === 0);
    if (gameIsOver) {
      game.isOver = true;
      fallingSubscription.unsubscribe();
    } else {
      game.figure = getNewShape(game.board.width);
    }
  } else {
    //moveShapeDown(game);
    store.dispatch(actions.figureMoveDown());
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
        //moveShapeDown(game);
        store.dispatch(actions.figureMoveDown());
        break;
    }
  });

var renderer = new RendererDom();
renderer.initialize(game, store);
renderer.start(game);
