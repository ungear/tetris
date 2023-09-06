import {
  FIGURE_GENERATE_NEXT,
} from "../types";
import { Figure } from "../../../typing/figure";
import { Game } from "../../../typing/game";
import { getNewShape } from "../../logic";


export function nextFigureReducer(
  state: Game = {} as Game,
  action: any
): Figure {
  switch (action.type) {
    case FIGURE_GENERATE_NEXT:
      return getNewShape(state.board.width);
    default:
      return state.nextFigure;
  }
}