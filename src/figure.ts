import { Figure, FigureForm } from "../typing/figure";
import cloneDeep from "lodash/cloneDeep";

const Shapes: { [key: string]: Figure } = {
  [FigureForm.Square]: {
    form: FigureForm.Square,
    blocks: [
      { x: 0, y: 0, color: 0 },
      { x: 0, y: 1, color: 0 },
      { x: 1, y: 0, color: 0 },
      { x: 1, y: 1, color: 0 }
    ],
    centralBlockIndex: 0
  },
  [FigureForm.Sausage]: {
    form: FigureForm.Sausage,
    blocks: [
      { x: 0, y: 0, color: 0 },
      { x: 0, y: 1, color: 0 },
      { x: 0, y: 2, color: 0 },
      { x: 0, y: 3, color: 0 }
    ],
    centralBlockIndex: 1
  },
  [FigureForm.Cross]: {
    form: FigureForm.Cross,
    blocks: [
      { x: 1, y: 0, color: 0 },
      { x: 0, y: 1, color: 0 },
      { x: 1, y: 1, color: 0 },
      { x: 2, y: 1, color: 0 }
    ],
    centralBlockIndex: 2
  },
  [FigureForm.Cripple]: {
    form: FigureForm.Cripple,
    blocks: [
      { x: 1, y: 0, color: 0 },
      { x: 0, y: 1, color: 0 },
      { x: 1, y: 1, color: 0 },
      { x: 0, y: 2, color: 0 }
    ],
    centralBlockIndex: 1
  },
  [FigureForm.CrippleRev]: {
    form: FigureForm.CrippleRev,
    blocks: [
      { x: 0, y: 0, color: 0 },
      { x: 0, y: 1, color: 0 },
      { x: 1, y: 1, color: 0 },
      { x: 1, y: 2, color: 0 }
    ],
    centralBlockIndex: 1
  },
  [FigureForm.Pipe]: {
    form: FigureForm.Pipe,
    blocks: [
      { x: 0, y: 0, color: 0 },
      { x: 0, y: 1, color: 0 },
      { x: 0, y: 2, color: 0 },
      { x: 1, y: 2, color: 0 }
    ],
    centralBlockIndex: 1
  },
  [FigureForm.PipeRev]: {
    form: FigureForm.PipeRev,
    blocks: [
      { x: 1, y: 0, color: 0 },
      { x: 1, y: 1, color: 0 },
      { x: 1, y: 2, color: 0 },
      { x: 0, y: 2, color: 0 }
    ],
    centralBlockIndex: 1
  }
};

export function getRandomShapeDraft(): Figure {
  const shapesNunber = Object.keys(Shapes).length;
  const rakdomShapeIndex = Math.floor(Math.random() * shapesNunber);
  const randomShapeKey = Object.keys(Shapes)[rakdomShapeIndex];
  return cloneDeep(Shapes[randomShapeKey]);
}

export function rotateFigure(figure: Figure): Figure {
  // To rotate clockwise (θ = 90 deg ):
  // x' = x cos θ − y sin θ
  // y' = x sin θ + y cos θ

  if (figure.form === FigureForm.Square) return figure;
  const centerBlock = figure.blocks[figure.centralBlockIndex]; //getFigureCentralBlock(figure);
  const angleRad = (90 * Math.PI) / 180;
  figure.blocks
    .filter(b => b != centerBlock)
    .forEach(b => {
      const vectorX = b.x - centerBlock.x;
      const vectorY = b.y - centerBlock.y;
      const vectorNewX =
        vectorX * Math.cos(angleRad) - vectorY * Math.sin(angleRad);
      const vectorNewY =
        vectorX * Math.sin(angleRad) + vectorY * Math.cos(angleRad);
      b.x = Math.round(vectorNewX) + centerBlock.x;
      b.y = Math.round(vectorNewY) + centerBlock.y;
    });
  return figure;
}
