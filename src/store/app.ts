import { combineReducers } from "redux";
import { SCORE_ADD, ScoreAddAction, FIGURE_MOVE_DOWN } from "./types";
import { Figure } from "../../typing/figure";

function scoreReducer(state = 0, action: ScoreAddAction): number {
  switch (action.type) {
    case SCORE_ADD:
      return state + action.scoreGained;
    default:
      return state;
  }
}

function figureReducer(state: Figure = {} as Figure, action: any): Figure {
  switch (action.type) {
    case FIGURE_MOVE_DOWN:
      return {
        ...state,
        blocks: state.blocks.slice().map(b => {
          b.y++;
          return b;
        })
      };
    default:
      return state;
  }
}

export const app = combineReducers({
  score: scoreReducer,
  figure: figureReducer
});
