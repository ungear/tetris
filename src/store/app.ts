import { combineReducers } from "redux";
import { SCORE_ADD, ScoreAddAction, GAME_OVER, GameOverAction } from "./types";
import { figureReducer } from "./figure/figureReducers";
import { Board } from "../../typing/Board";
import { Game } from "../../typing/game";
import { boardReducer } from "./board/boardReducers";

function scoreReducer(state = 0, action: ScoreAddAction): number {
  switch (action.type) {
    case SCORE_ADD:
      return state + action.scoreGained;
    default:
      return state;
  }
}

function gameOverReducer(state = false, action: any): boolean {
  switch (action.type) {
    case GAME_OVER:
      return true;
    default:
      return state;
  }
}

export function app(state: Game = {} as Game, action: any) {
  return {
    score: scoreReducer(state.score, action),
    figure: figureReducer(state, action),
    board: boardReducer(state, action),
    isOver: gameOverReducer(state.isOver, action)
  };
}
