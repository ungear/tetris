import { combineReducers } from "redux";
import { SCORE_ADD, ScoreAddAction } from "./types";

function scoreReducer(state = 0, action: ScoreAddAction): number {
  switch (action.type) {
    case SCORE_ADD:
      return state + action.scoreGained;
    default:
      return state;
  }
}

export const app = combineReducers({
  score: scoreReducer
});
