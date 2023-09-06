import {
  FIGURE_LAUNCH_NEW,
  FIGURE_MOVE_DOWN,
  FIGURE_MOVE_LEFT,
  FIGURE_MOVE_RIGHT,
  FIGURE_ROTATE
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
import { rotateFigure } from "../../figure";
import { cloneDeep } from "lodash";

export function currentFigureReducer(
  state: Game = {} as Game,
  action: any
): Figure {
  let figure = cloneDeep(state.currentFigure);
  switch (action.type) {
    case FIGURE_MOVE_DOWN:
      return moveDown(figure, state.board);
    case FIGURE_MOVE_LEFT:
      return moveLeft(figure, state.board);
    case FIGURE_MOVE_RIGHT:
      return moveRight(figure, state.board);
    case FIGURE_ROTATE:
      return rotate(figure, state.board);
    case FIGURE_LAUNCH_NEW:
      return state.nextFigure;
    default:
      return state.currentFigure;
  }
}

function moveLeft(figure: Figure, board: Board): Figure {
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

function moveRight(figure: Figure, board: Board): Figure {
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

function moveDown(figure: Figure, board: Board): Figure {
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

function rotate(originalFigure: Figure, board: Board): Figure {
  let rotatedFigure = cloneDeep(originalFigure);
  rotateFigure(rotatedFigure);
  let isIntersectFragments = rotatedFigure.blocks.some(
    b => !!getBoardFragmentByCoords({ board, x: b.x, y: b.y })
  );

  let isBeyondLeftBorder = rotatedFigure.blocks.some(b => b.x < 0);
  let isBeyondRightBorder = rotatedFigure.blocks.some(
    b => b.x > board.width - 1
  );
  let canBeRotated =
    !isIntersectFragments && !isBeyondLeftBorder && !isBeyondRightBorder;

  return canBeRotated ? rotatedFigure : originalFigure;
}
