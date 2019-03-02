import {
  FIGURE_MOVE_DOWN,
  FigureMoveDownAction,
  FIGURE_MOVE_LEFT,
  FigureMoveLeftAction,
  FIGURE_MOVE_RIGHT,
  FigureMoveRightAction
} from "../types";

export function figureMoveDown(): FigureMoveDownAction {
  return { type: FIGURE_MOVE_DOWN };
}

export function figureMoveLeft(): FigureMoveLeftAction {
  return { type: FIGURE_MOVE_LEFT };
}

export function figureMoveRight(): FigureMoveRightAction {
  return { type: FIGURE_MOVE_RIGHT };
}
