import { Figure } from "../typing/figure";
import { Board } from "../typing/board";
import { getRandomShapeDraft } from "./figure";

function getRandomBlockColor(): number {
  const redPart = Math.random() > 0.5 ? 1 : 0;
  const greenPart = Math.random() > 0.5 ? 1 : 0;
  const bluePart = Math.random() > 0.5 ? 1 : 0;
  const base = 0x88;
  const generatedColor =
    base * redPart * 0x10000 + base * greenPart * 0x100 + base * bluePart;
  return generatedColor === 0 || generatedColor === 0x888888 || generatedColor === 0x000088
    ? getRandomBlockColor()
    : generatedColor;
}

export function getNewShape(boardWidth: number, blockIdSeed: number): Figure {
  const shapeDraft = getRandomShapeDraft();
  shapeDraft.blocks.forEach(b => {
    blockIdSeed++;
    b.id = blockIdSeed;
  })
  shapeDraft.blocks.forEach(b => {
    // move to center
    b.x = b.x + Math.floor(boardWidth / 2) - 1;
    b.color = getRandomBlockColor();
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
