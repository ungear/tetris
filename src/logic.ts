import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { getRandomShapeDraft } from "./figure";

export function getNewShape(boardWidth: number): Figure {
  let shapeDraft = getRandomShapeDraft();
  shapeDraft.blocks.forEach(b => {
    b.x = b.x + Math.floor(boardWidth / 2) - 1;
  });
  return shapeDraft;
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
