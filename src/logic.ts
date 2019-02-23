import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { getRandomShapeDraft } from "./shape";

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

export function getNewShape(boardWidth: number): Shape {
  let shapeDraft = getRandomShapeDraft();
  shapeDraft.blocks.forEach(b => {
    b.x = b.x + Math.floor(boardWidth / 2) - 1;
  });
  return shapeDraft;
}

export function isShapeLandedOnFragment(game: Game): boolean {
  //number of blocks which is right above any board's fragment
  return (
    game.shape.blocks.filter(
      b => !!getBoardFragmentByCoords({ board: game.board, x: b.x, y: b.y + 1 })
    ).length > 0
  );
}

export function isShapeLandedOnBottom(game: Game): boolean {
  return game.shape.blocks.some(b => b.y === game.board.height - 1);
}

export function moveShapeDown(game: Game) {
  let isAboveFragment = isShapeLandedOnFragment(game);
  let isAboveBottom = isShapeLandedOnBottom(game);
  let canBeMoved = !isAboveFragment && !isAboveBottom;
  if (canBeMoved) {
    game.shape.blocks.forEach(b => b.y++);
  }
}

export function moveShapeLeft(game: Game) {
  let isShapeNearLeftBorder =
    game.shape.blocks.filter(b => b.x === 0).length > 0;
  let willShapeIntersectFragments =
    game.shape.blocks.filter(
      b => !!getBoardFragmentByCoords({ board: game.board, x: b.x - 1, y: b.y })
    ).length > 0;
  let canBeMoved = !isShapeNearLeftBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    game.shape.blocks.forEach(b => b.x--);
  }
}

export function moveShapeRight(game: Game) {
  let isShapeNearRightBorder =
    game.shape.blocks.filter(b => b.x === game.board.width - 1).length > 0;
  let willShapeIntersectFragments =
    game.shape.blocks.filter(
      b => !!getBoardFragmentByCoords({ board: game.board, x: b.x + 1, y: b.y })
    ).length > 0;
  let canBeMoved = !isShapeNearRightBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    game.shape.blocks.forEach(b => b.x++);
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
    .map(x => x.rowYCoord);
}

export function handleCompletedRows(board: Board, rowYcoords: number[]) {
  // delete blocks in specified rows
  rowYcoords.forEach(y => destroyRow(board, y));

  // move down rows abowe deleted
  rowYcoords.forEach(deletedRowY =>
    board.fragments
      .filter(b => b.y < deletedRowY)
      .forEach(b => (b.y = b.y + rowYcoords.length))
  );
}

export function destroyRow(board: Board, rowYcoord: number) {
  board.fragments = board.fragments.filter(b => b.y !== rowYcoord);
}
