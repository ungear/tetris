import {
  FIGURE_MOVE_DOWN,
  FigureMoveDownAction,
  FIGURE_MOVE_LEFT,
  FigureMoveLeftAction
} from "../types";

export function figureMoveDown(): FigureMoveDownAction {
  return { type: FIGURE_MOVE_DOWN };
}

export function figureMoveLeft(): FigureMoveLeftAction {
  return { type: FIGURE_MOVE_LEFT };
}
