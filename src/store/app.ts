import { SCORE_ADD, ScoreAddAction, GAME_OVER } from "./types";
import { Game } from "../../typing/game";
import { boardReducer } from "./board/boardReducers";
import { currentFigureReducer } from "./currentFigure/currentFigureReducers";
import { nextFigureReducer } from "./nextFigure/nextFigureReducers";
import { Action } from "redux";

function scoreReducer(state = 0, action: Action): number {
  switch (action.type) {
    case SCORE_ADD:
      return state + (action as ScoreAddAction).scoreGained;
    default:
      return state;
  }
}

function gameOverReducer(state = false, action: Action): boolean {
  switch (action.type) {
    case GAME_OVER:
      return true;
    default:
      return state;
  }
}

export function app(state: Game = {} as Game, action: Action) {
  return {
    score: scoreReducer(state.score, action),
    currentFigure: currentFigureReducer(state, action),
    nextFigure: nextFigureReducer(state, action),
    board: boardReducer(state, action),
    isOver: gameOverReducer(state.isOver, action)
  };
}
