import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { UserAction, getUserActionByKey } from "./userAction";
import { interval, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { getYcoordsOfFullRows, getNewShape } from "./logic";
import { Renderer3d } from "./renderer3d/renderer3d";
import { createStore } from "redux";
import { app } from "./store/app";
import * as actions from "./store/actions";
import * as currentFigureActions from "./store/currentFigure/currentFigureActions";
import * as nextFigureActions from "./store/nextFigure/nextFigureActions";
import * as boardActions from "./store/board/boardActions";
import {
  isFigureLandedOnBottom,
  isFigureLandedOnFragment
} from "./store/helpers";

const FALLING_INTERVAL_MS = 500;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 15;

var board: Board = { width: BOARD_WIDTH, height: BOARD_HEIGHT, fragments: [] };

const initialState: Game = {
  score: 0,
  currentFigure: null,
  nextFigure: null,
  board,
  isOver: false
};
const store = createStore(app, initialState);
store.dispatch(nextFigureActions.figureGenerateNext());
store.dispatch(currentFigureActions.figureLaunchNew());
store.dispatch(nextFigureActions.figureGenerateNext());

const falling$ = interval(FALLING_INTERVAL_MS);
const fallingSubscription = falling$.subscribe(_ => {
  let { currentFigure, board } = store.getState();
  if (
    isFigureLandedOnFragment(currentFigure, board) ||
    isFigureLandedOnBottom(currentFigure, board)
  ) {
    //add figure to fragments
    store.dispatch(boardActions.boardAddFragments(currentFigure.blocks));

    //calculate row to destroy
    let fullRowsCoords = getYcoordsOfFullRows(store.getState().board);
    if (fullRowsCoords.length) {
      store.dispatch(boardActions.boardHandleFullRows(fullRowsCoords));

      store.dispatch(actions.scoreAdd(fullRowsCoords.length));
    }

    //check defeat
    let gameIsOver = store.getState().board.fragments.some(b => b.y <= 0);
    if (gameIsOver) {
      store.dispatch(actions.gameOver());
      fallingSubscription.unsubscribe();
    } else {
      store.dispatch(currentFigureActions.figureLaunchNew());
      store.dispatch(nextFigureActions.figureGenerateNext());
    }
  } else {
    store.dispatch(currentFigureActions.figureMoveDown());
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
        store.dispatch(currentFigureActions.figureMoveLeft());
        break;
      case UserAction.Right:
        store.dispatch(currentFigureActions.figureMoveRight());
        break;
      case UserAction.Down:
        store.dispatch(currentFigureActions.figureMoveDown());
        break;
      case UserAction.Rotate:
        store.dispatch(currentFigureActions.figureRotate());
        break;
    }
  });

var renderer = new Renderer3d(store);
renderer.start();
// var renderer = new RendererDom();
// renderer.initialize(store);
// renderer.start();
