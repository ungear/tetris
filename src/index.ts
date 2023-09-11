import { UserAction, getUserActionByKey } from "./userAction";
import { interval, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { getYcoordsOfFullRows } from "./logic";
import { Renderer3d } from "./renderer3d/renderer3d";

import {
  isFigureLandedOnBottom,
  isFigureLandedOnFragment
} from "./store/helpers";
import store from './store/app';
import { 
  addFragments, 
  handleFullRows, 
  setBoardSize, 
  moveCurrentFigureDown,
  moveCurrentFigureLeft,
  moveCurrentFigureRight,
  rotateCurrentFigure,
  launchNewFigure,
  generateNextFigure, 
} from "./store/boardSlice";

import { addScoreForLines } from "./store/scoreSlice";
import { setIsOverValue } from "./store/isOverSlice";

const FALLING_INTERVAL_MS = 500;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 15;

store.dispatch(setBoardSize({ width: BOARD_WIDTH, height: BOARD_HEIGHT }))
store.dispatch(generateNextFigure());
store.dispatch(launchNewFigure());
store.dispatch(generateNextFigure());

const falling$ = interval(FALLING_INTERVAL_MS);
const fallingSubscription = falling$.subscribe(() => {
  const { board } = store.getState();
  const currentFigure = board.currentFigure;
  if (
    isFigureLandedOnFragment(currentFigure, board) ||
    isFigureLandedOnBottom(currentFigure, board)
  ) {
    //add figure to fragments
    store.dispatch(addFragments({ fragments: currentFigure.blocks }));

    //calculate row to destroy
    const fullRowsCoords = getYcoordsOfFullRows(store.getState().board);
    if (fullRowsCoords.length) {
      store.dispatch(handleFullRows({ rowsYcoords: fullRowsCoords }));

      store.dispatch(addScoreForLines(fullRowsCoords.length));
    }

    //check defeat
    const gameIsOver = store.getState().board.fragments.some(b => b.y <= 0);
    if (gameIsOver) {
      store.dispatch(setIsOverValue(true));
      fallingSubscription.unsubscribe();
    } else {
      store.dispatch(launchNewFigure());
      store.dispatch(generateNextFigure());
    }
  } else {
    store.dispatch(moveCurrentFigureDown());
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
        store.dispatch(moveCurrentFigureLeft());
        break;
      case UserAction.Right:
        store.dispatch(moveCurrentFigureRight());
        break;
      case UserAction.Down:
        store.dispatch(moveCurrentFigureDown());
        break;
      case UserAction.Rotate:
        store.dispatch(rotateCurrentFigure());
        break;
    }
  });

const renderer = new Renderer3d(store);
renderer.start();