import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Block } from "../typing/block";
import { cloneDeep } from "lodash";

const Shapes: { [key: string]: Figure } = {
  [FigureForm.Square]: {
    form: FigureForm.Square,
    blocks: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
  },
  [FigureForm.Sausage]: {
    form: FigureForm.Square,
    blocks: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
  },
  [FigureForm.Cross]: {
    form: FigureForm.Square,
    blocks: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }]
  },
  [FigureForm.Cripple]: {
    form: FigureForm.Cripple,
    blocks: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }]
  },
  [FigureForm.CrippleRev]: {
    form: FigureForm.CrippleRev,
    blocks: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
  },
  [FigureForm.Pipe]: {
    form: FigureForm.Pipe,
    blocks: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]
  },
  [FigureForm.PipeRev]: {
    form: FigureForm.PipeRev,
    blocks: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }]
  }
};

export function getRandomShapeDraft(): Figure {
  let shapesNunber = Object.keys(Shapes).length;
  let rakdomShapeIndex = Math.floor(Math.random() * shapesNunber);
  let randomShapeKey = Object.keys(Shapes)[rakdomShapeIndex];
  return cloneDeep(Shapes[randomShapeKey]);
}

export function rotateFigure({
  board,
  figure
}: {
  board: Board;
  figure: Figure;
}) {}

/*
  Central blocks for figures:
    x 0   0 x 0 0   0      x     0       0
    0 0             x    0 0 0   x 0   x 0   0 x 0
                    0            0       0     0
                    0 

      0   0 x        0       x 0   0     0 x 0    0   0
    x 0     0 0      x 0   0 0     x     0        x   0 x 0
    0                  0           0 0          0 0
*/

export function getFigureCentralBlock(figure: Figure): Block {
  let blockCoordsX = figure.blocks.map(b => b.x);
  let blockCoordsY = figure.blocks.map(b => b.y);
  let maxX = Math.max(...blockCoordsX);
  let minX = Math.min(...blockCoordsX);
  let maxY = Math.max(...blockCoordsY);
  let minY = Math.min(...blockCoordsY);

  let centerX = Math.floor((maxX + minX) / 2);
  let centerY = Math.floor((maxY + minY) / 2);
  let centerBlock = figure.blocks.find(b => b.x === centerX && b.y === centerY);
  if (centerBlock) return centerBlock;

  // common algorithm does not work for PipeRev, need to apply an alternative way to calculate the center
  centerX = Math.ceil((maxX + minX) / 2);
  centerY = Math.ceil((maxY + minY) / 2);
  return figure.blocks.find(b => b.x === centerX && b.y === centerY);
}
