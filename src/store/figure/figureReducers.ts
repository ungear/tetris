import { FIGURE_MOVE_DOWN } from "../types";
import { Figure } from "../../../typing/figure";

export function figureReducer(
  state: Figure = {} as Figure,
  action: any
): Figure {
  switch (action.type) {
    case FIGURE_MOVE_DOWN:
      return {
        ...state,
        blocks: state.blocks.slice().map(b => {
          b.y++;
          return b;
        })
      };
    default:
      return state;
  }
}
