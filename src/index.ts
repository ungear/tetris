import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { UserAction, getUserActionByKey } from "./userAction";
import { interval, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import {
  getNewShape,
  getYcoordsOfFullRows,
  handleCompletedRows
} from "./logic";
import { RendererDom } from "./rendererDom";
import { createStore } from "redux";
import { app } from "./store/app";
import * as actions from "./store/actions";
import * as figureActions from "./store/figure/figureActions";
import * as boardActions from "./store/board/boardActions";
import { GameState } from "./store/types";
import {
  isFigureLandedOnBottom,
  isFigureLandedOnFragment
} from "./store/helpers";

const FALLING_INTERVAL_MS = 500;
const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 10;

let f = getNewShape(BOARD_WIDTH);

var board: Board = { width: BOARD_WIDTH, height: BOARD_HEIGHT, fragments: [] };

const initialState: GameState = {
  score: 0,
  figure: getNewShape(BOARD_WIDTH),
  board
};
const store = createStore(app, initialState);

var game: Game = {
  figure: f,
  board,
  isOver: false
};

const falling$ = interval(FALLING_INTERVAL_MS);
const fallingSubscription = falling$.subscribe(_ => {
  let { figure, board } = store.getState();
  if (
    isFigureLandedOnFragment(figure, board) ||
    isFigureLandedOnBottom(figure, board)
  ) {
    //add shape to fragments
    store.dispatch(boardActions.boardAddFragments(figure.blocks));

    //calculate row to destroy
    let fullRowsCoords = getYcoordsOfFullRows(store.getState().board);
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
    // To rotate clockwise (θ = -90 deg ):
    // x' = x cos θ − y sin θ
    // y' = x sin θ + y cos θ
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
renderer.initialize(game, store);
renderer.start(game);
