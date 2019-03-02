import { Figure } from "../../typing/figure";

export const SCORE_ADD = "SCORE_ADD";
export const FIGURE_MOVE_DOWN = "FIGURE_MOVE_DOWN";
export const FIGURE_MOVE_LEFT = "FIGURE_MOVE_LEF";

export interface ScoreAddAction {
  type: typeof SCORE_ADD;
  scoreGained: number;
}

export interface FigureMoveDownAction {
  type: typeof FIGURE_MOVE_DOWN;
}

export interface FigureMoveLeftAction {
  type: typeof FIGURE_MOVE_LEFT;
}

export interface GameState {
  score: number;
  figure: Figure;
}
