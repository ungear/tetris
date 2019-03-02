import { FIGURE_MOVE_DOWN, FIGURE_MOVE_LEFT, GameState } from "../types";
import { Figure } from "../../../typing/figure";
import { Board } from "../../../typing/board";
import { getBoardFragmentByCoords } from "../helpers";

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
      return moveLeft(figure, state.board);
    default:
      return figure;
  }
}

export function moveLeft(figure: Figure, board: Board): Figure {
  let isShapeNearLeftBorder = figure.blocks.filter(b => b.x === 0).length > 0;
  let willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x - 1, y: b.y })
    ).length > 0;
  let canBeMoved = !isShapeNearLeftBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    return {
      ...figure,
      blocks: figure.blocks.slice().map(b => ({ ...b, x: --b.x }))
    };
  } else return figure;
}
