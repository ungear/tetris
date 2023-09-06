import {
  FIGURE_GENERATE_NEXT,
  FigureGenerateNextAction
} from "../types";

export function figureGenerateNext(): FigureGenerateNextAction {
  return { type: FIGURE_GENERATE_NEXT };
}