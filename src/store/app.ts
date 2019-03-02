import { combineReducers } from "redux";
import { SCORE_ADD, ScoreAddAction, GameState } from "./types";
import { figureReducer } from "./figure/figureReducers";
import { Board } from "../../typing/Board";
import { boardReducer } from "./board/boardReducers";

function scoreReducer(state = 0, action: ScoreAddAction): number {
  switch (action.type) {
    case SCORE_ADD:
      return state + action.scoreGained;
    default:
      return state;
  }
}

export function app(state: GameState = {} as GameState, action: any) {
  return {
    score: scoreReducer(state.score, action),
    figure: figureReducer(state, action),
    board: boardReducer(state, action)
  };
}
