import { FIGURE_MOVE_DOWN, FIGURE_MOVE_LEFT, GameState } from "../types";
import { Figure } from "../../../typing/figure";

export function figureReducer(
  state: GameState = {} as GameState,
  action: any
): Figure {
  let figure = state.figure;
  switch (action.type) {
    case FIGURE_MOVE_DOWN:
      return {
        ...figure,
        blocks: figure.blocks.slice().map(b => {
          b.y++;
          return b;
        })
      };
    case FIGURE_MOVE_LEFT:
      return {
        ...figure,
        blocks: figure.blocks.slice().map(b => {
          b.x--;
          return b;
        })
      };
    default:
      return figure;
  }
}
