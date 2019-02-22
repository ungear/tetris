import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";
import { Game } from "../typing/game";

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
  let form = ShapeForm.Square;
  let shapeLeftXcoord = Math.floor(boardWidth / 2) - 1;
  return {
    form,
    blocks: [
      { x: shapeLeftXcoord, y: 0 },
      { x: shapeLeftXcoord + 1, y: 0 },
      { x: shapeLeftXcoord, y: 1 },
      { x: shapeLeftXcoord + 1, y: 1 }
    ]
  };
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

export function moveShapeDown(shape: Shape) {
  shape.blocks.forEach(b => b.y++);
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
