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
  NEXT_FIGURE_OFFSET,
  getBoardFragmentByCoords,
  isFigureLandedOnBottom,
  isFigureLandedOnFragment
} from "../helpers";
import { rotateFigure } from "../../figure";
import { cloneDeep } from "lodash";
import { Action } from "redux";

export function currentFigureReducer(
  state: Game = {} as Game,
  action: Action
): Figure {
  const figure = cloneDeep(state.currentFigure);
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
      state.nextFigure.blocks.forEach(b => {
        b.x = b.x + state.board.width / 2 + NEXT_FIGURE_OFFSET;
      });
      return state.nextFigure;
    default:
      return state.currentFigure;
  }
}

function moveLeft(figure: Figure, board: Board): Figure {
  const isShapeNearLeftBorder = figure.blocks.filter(b => b.x === 0).length > 0;
  const willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x - 1, y: b.y })
    ).length > 0;
  const canBeMoved = !isShapeNearLeftBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    return {
      ...figure,
      blocks: figure.blocks.slice().map(b => ({ ...b, x: --b.x }))
    };
  } else return figure;
}

function moveRight(figure: Figure, board: Board): Figure {
  const isShapeNearRightBorder =
    figure.blocks.filter(b => b.x === board.width - 1).length > 0;
    const willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x + 1, y: b.y })
    ).length > 0;
  const canBeMoved = !isShapeNearRightBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    return {
      ...figure,
      blocks: figure.blocks.slice().map(b => ({ ...b, x: ++b.x }))
    };
  } else return figure;
}

function moveDown(figure: Figure, board: Board): Figure {
  const isAboveFragment = isFigureLandedOnFragment(figure, board);
  const isAboveBottom = isFigureLandedOnBottom(figure, board);
  const canBeMoved = !isAboveFragment && !isAboveBottom;
  if (canBeMoved) {
    return {
      ...figure,
      blocks: figure.blocks.slice().map(b => ({ ...b, y: ++b.y }))
    };
  } else return figure;
}

function rotate(originalFigure: Figure, board: Board): Figure {
  const rotatedFigure = cloneDeep(originalFigure);
  rotateFigure(rotatedFigure);
  const isIntersectFragments = rotatedFigure.blocks.some(
    b => !!getBoardFragmentByCoords({ board, x: b.x, y: b.y })
  );

  const isBeyondLeftBorder = rotatedFigure.blocks.some(b => b.x < 0);
  const isBeyondRightBorder = rotatedFigure.blocks.some(
    b => b.x > board.width - 1
  );
  const canBeRotated =
    !isIntersectFragments && !isBeyondLeftBorder && !isBeyondRightBorder;

  return canBeRotated ? rotatedFigure : originalFigure;
}
