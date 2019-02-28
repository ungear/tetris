import { combineReducers } from "redux";
import * as actions from "./actions";

function scoreReducer(state = 0, action: any) {
  switch (action.type) {
    case actions.score_add:
      return state + action.extra;
    default:
      return state;
  }
}

export const app = combineReducers({
  score: scoreReducer
});
