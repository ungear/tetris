import { FIGURE_MOVE_DOWN, FigureMoveDownAction } from "../types";

export function figureMoveDown(): FigureMoveDownAction {
  return { type: FIGURE_MOVE_DOWN };
}
