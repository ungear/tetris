import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { getRandomShapeDraft } from "./figure";

export function getBoardFragmentByCoords({
  board,
  x,
  y
}: {
  board: Board;
  x: number;
  y: number;
}): Block {
  return board.fragments.find(b => b.x === x && b.y === y);
}

export function getNewShape(boardWidth: number): Figure {
  let shapeDraft = getRandomShapeDraft();
  shapeDraft.blocks.forEach(b => {
    b.x = b.x + Math.floor(boardWidth / 2) - 1;
  });
  return shapeDraft;
}

export function isShapeLandedOnFragment(game: Game): boolean {
  //number of blocks which is right above any board's fragment
  return (
    game.figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board: game.board, x: b.x, y: b.y + 1 })
    ).length > 0
  );
}

export function isShapeLandedOnBottom(game: Game): boolean {
  return game.figure.blocks.some(b => b.y === game.board.height - 1);
}

export function moveShapeDown(game: Game) {
  let isAboveFragment = isShapeLandedOnFragment(game);
  let isAboveBottom = isShapeLandedOnBottom(game);
  let canBeMoved = !isAboveFragment && !isAboveBottom;
  if (canBeMoved) {
    game.figure.blocks.forEach(b => b.y++);
  }
}

export function moveShapeRight(game: Game) {
  let isShapeNearRightBorder =
    game.figure.blocks.filter(b => b.x === game.board.width - 1).length > 0;
  let willShapeIntersectFragments =
    game.figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board: game.board, x: b.x + 1, y: b.y })
    ).length > 0;
  let canBeMoved = !isShapeNearRightBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    game.figure.blocks.forEach(b => b.x++);
  }
}

export function getYcoordsOfFullRows(board: Board): number[] {
  return board.fragments
    .reduce(
      (acc, b) => {
        if (!acc[b.y]) acc[b.y] = 0;
        acc[b.y]++;
        return acc;
      },
      [] as number[]
    )
    .map((value, index) => ({ rowYCoord: index, fragmentsNumber: value }))
    .filter(x => x.fragmentsNumber === board.width)
    .map(x => x.rowYCoord)
    .sort();
}

export function handleCompletedRows(board: Board, rowYcoords: number[]) {
  // delete blocks in specified rows
  rowYcoords.forEach(y => destroyRow(board, y));

  // move down rows abowe deleted
  rowYcoords.forEach(deletedRowY =>
    board.fragments.filter(b => b.y < deletedRowY).forEach(b => b.y++)
  );
}

export function destroyRow(board: Board, rowYcoord: number) {
  board.fragments = board.fragments.filter(b => b.y !== rowYcoord);
}
