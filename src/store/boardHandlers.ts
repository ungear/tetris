import cloneDeep from "lodash/cloneDeep";
import { Board } from "../../typing/board";
import { getBoardFragmentByCoords, isFigureLandedOnBottom, isFigureLandedOnFragment } from "./helpers";
import { rotateFigure } from "../figure";

export function moveLeft(board: Board): void {
  const figure = board.currentFigure;
  const isShapeNearLeftBorder = figure.blocks.filter(b => b.x === 0).length > 0;
  const willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x - 1, y: b.y })
    ).length > 0;
  const canBeMoved = !isShapeNearLeftBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    figure.blocks.forEach(b => ({ ...b, x: --b.x }))
  }
}

export function moveRight(board: Board): void {
  const figure = board.currentFigure;
  const isShapeNearRightBorder =
    figure.blocks.filter(b => b.x === board.width - 1).length > 0;
    const willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x + 1, y: b.y })
    ).length > 0;
  const canBeMoved = !isShapeNearRightBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    figure.blocks.forEach(b => ({ ...b, x: ++b.x  }))
  }
}

export function moveDown(board: Board): void {
  const figure = board.currentFigure;
  const isAboveFragment = isFigureLandedOnFragment(figure, board);
  const isAboveBottom = isFigureLandedOnBottom(figure, board);
  const canBeMoved = !isAboveFragment && !isAboveBottom;
  if (canBeMoved) {
    figure.blocks.forEach(b => ({ ...b, y: ++b.y }))
  }
}

export function rotate(board: Board): void {
  const originalFigure = board.currentFigure;
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

  if(canBeRotated){
    board.currentFigure = rotatedFigure;
  }
}
