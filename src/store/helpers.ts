import { Board } from "../../typing/board";
import { Block } from "../../typing/block";
import { Figure } from "../../typing/figure";

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

export function isFigureLandedOnFragment(
  figure: Figure,
  board: Board
): boolean {
  //number of blocks which is right above any board's fragment
  return (
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x, y: b.y + 1 })
    ).length > 0
  );
}

export function isFigureLandedOnBottom(figure: Figure, board: Board): boolean {
  return figure.blocks.some(b => b.y === board.height - 1);
}
