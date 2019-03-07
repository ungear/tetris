import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { UserAction, getUserActionByKey } from "./userAction";
import { interval, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { getYcoordsOfFullRows } from "./logic";
import { RendererDom } from "./rendererDom";
import { createStore } from "redux";
import { app } from "./store/app";
import * as actions from "./store/actions";
import * as figureActions from "./store/figure/figureActions";
import * as boardActions from "./store/board/boardActions";
import {
  isFigureLandedOnBottom,
  isFigureLandedOnFragment
} from "./store/helpers";

const FALLING_INTERVAL_MS = 500;
const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 10;

var board: Board = { width: BOARD_WIDTH, height: BOARD_HEIGHT, fragments: [] };

const initialState: Game = {
  score: 0,
  figure: null,
  board,
  isOver: false
};
const store = createStore(app, initialState);
store.dispatch(figureActions.figureLaunchNew());

const falling$ = interval(FALLING_INTERVAL_MS);
const fallingSubscription = falling$.subscribe(_ => {
  let { figure, board } = store.getState();
  if (
    isFigureLandedOnFragment(figure, board) ||
    isFigureLandedOnBottom(figure, board)
  ) {
    //add figure to fragments
    store.dispatch(boardActions.boardAddFragments(figure.blocks));

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
      store.dispatch(figureActions.figureLaunchNew());
    }
  } else {
    store.dispatch(figureActions.figureMoveDown());
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
        store.dispatch(figureActions.figureMoveLeft());
        break;
      case UserAction.Right:
        store.dispatch(figureActions.figureMoveRight());
        break;
      case UserAction.Down:
        store.dispatch(figureActions.figureMoveDown());
        break;
    }
  });

var renderer = new RendererDom();
renderer.initialize(store);
renderer.start();
