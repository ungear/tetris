import {
  FIGURE_GENERATE_NEXT,
} from "../types";
import { Figure } from "../../../typing/figure";
import { Game } from "../../../typing/game";
import { getNewShape } from "../../logic";
import { NEXT_FIGURE_OFFSET } from "../helpers";


export function nextFigureReducer(
  state: Game = {} as Game,
  action: any
): Figure {
  switch (action.type) {
    case FIGURE_GENERATE_NEXT:
      const maxExistingBlockId = state.nextFigure && state.nextFigure.blocks 
        ? Math.max(...state.nextFigure.blocks.map(b => b.id))
        : 0;
      const newShape =  getNewShape(state.board.width, maxExistingBlockId);
      newShape.blocks.forEach(b => {
        b.x = b.x - state.board.width / 2 - NEXT_FIGURE_OFFSET;
      });
      return newShape;
    default:
      return state.nextFigure;
  }
}