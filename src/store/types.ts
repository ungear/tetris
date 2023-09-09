import { Block } from "../../typing/block";

export const SCORE_ADD = "SCORE_ADD";
export const FIGURE_MOVE_DOWN = "FIGURE_MOVE_DOWN";
export const FIGURE_MOVE_LEFT = "FIGURE_MOVE_LEF";
export const FIGURE_MOVE_RIGHT = "FIGURE_MOVE_RIGHT";
export const FIGURE_ROTATE = "FIGURE_ROTATE";
export const FIGURE_LAUNCH_NEW = "FIGURE_LAUNCH_NEW";
export const FIGURE_GENERATE_NEXT = "FIGURE_GENERATE_NEXT";
export const BOARD_ADD_FRAGMENTS = "BOARD_ADD_FRAGMENTS";
export const BOARD_HANDLE_FULL_ROWS = "BOARD_HANDLE_FULL_ROWS";
export const GAME_OVER = "GAME_OVER";

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

export interface FigureRotateAction {
  type: typeof FIGURE_ROTATE;
}

export interface FigureLaunchNewAction {
  type: typeof FIGURE_LAUNCH_NEW;
}

export interface FigureGenerateNextAction {
  type: typeof FIGURE_GENERATE_NEXT;
}

export interface BoardAddFragmentsAction {
  type: typeof BOARD_ADD_FRAGMENTS;
  fragments: Block[];
}

export interface BoardHandleFullRowsAction {
  type: typeof BOARD_HANDLE_FULL_ROWS;
  rowsYcoords: number[];
}

export interface GameOverAction {
  type: typeof GAME_OVER;
}
