import { Figure } from "../../typing/figure";
import { Board } from "../../typing/board";
import { Block } from "../../typing/block";

export const SCORE_ADD = "SCORE_ADD";
export const FIGURE_MOVE_DOWN = "FIGURE_MOVE_DOWN";
export const FIGURE_MOVE_LEFT = "FIGURE_MOVE_LEF";
export const FIGURE_MOVE_RIGHT = "FIGURE_MOVE_RIGHT";
export const BOARD_ADD_FRAGMENTS = "BOARD_ADD_FRAGMENTS";
export const BOARD_HANDLE_FULL_ROWS = "BOARD_HANDLE_FULL_ROWS";

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

export interface FigureMoveRightAction {
  type: typeof FIGURE_MOVE_RIGHT;
}

export interface BoardAddFragmentsAction {
  type: typeof BOARD_ADD_FRAGMENTS;
  fragments: Block[];
}

export interface BoardHandleFullRowsAction {
  type: typeof BOARD_HANDLE_FULL_ROWS;
  rowsYcoords: number[];
}

export interface GameState {
  score: number;
  figure: Figure;
  board: Board;
}
