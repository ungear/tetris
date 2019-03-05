import {
  FIGURE_MOVE_DOWN,
  FIGURE_MOVE_LEFT,
  FIGURE_MOVE_RIGHT,
  FIGURE_LAUNCH_NEW,
  FigureLaunchNewAction
} from "../types";
import { Figure } from "../../../typing/figure";
import { Board } from "../../../typing/board";
import { Game } from "../../../typing/game";
import {
  getBoardFragmentByCoords,
  isFigureLandedOnBottom,
  isFigureLandedOnFragment
} from "../helpers";
import { getNewShape } from "../../logic";

export function figureReducer(state: Game = {} as Game, action: any): Figure {
  let figure = state.figure;
  switch (action.type) {
    case FIGURE_MOVE_DOWN:
      return moveDown(figure, state.board);
    case FIGURE_MOVE_LEFT:
      return moveLeft(figure, state.board);
    case FIGURE_MOVE_RIGHT:
      return moveRight(figure, state.board);
    case FIGURE_LAUNCH_NEW:
      return launchNewFigure(state.board.width);
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

export function moveRight(figure: Figure, board: Board): Figure {
  let isShapeNearRightBorder =
    figure.blocks.filter(b => b.x === board.width - 1).length > 0;
  let willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x + 1, y: b.y })
    ).length > 0;
  let canBeMoved = !isShapeNearRightBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    return {
      ...figure,
      blocks: figure.blocks.slice().map(b => ({ ...b, x: ++b.x }))
    };
  } else return figure;
}

export function moveDown(figure: Figure, board: Board): Figure {
  let isAboveFragment = isFigureLandedOnFragment(figure, board);
  let isAboveBottom = isFigureLandedOnBottom(figure, board);
  let canBeMoved = !isAboveFragment && !isAboveBottom;
  if (canBeMoved) {
    return {
      ...figure,
      blocks: figure.blocks.slice().map(b => ({ ...b, y: ++b.y }))
    };
  } else return figure;
}

export function launchNewFigure(boardWidth: number): Figure {
  return getNewShape(boardWidth);
}
