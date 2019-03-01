import {
  ScoreAddAction,
  SCORE_ADD,
  FIGURE_MOVE_DOWN,
  FigureMoveDownAction
} from "./types";

export function scoreAdd(scoreGained: number): ScoreAddAction {
  return { type: SCORE_ADD, scoreGained };
}

export function figureMoveDown(): FigureMoveDownAction {
  return { type: FIGURE_MOVE_DOWN };
}
