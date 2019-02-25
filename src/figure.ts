import { Figure, FigureForm } from "../typing/figure";
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
  }
};

export function getRandomShapeDraft(): Figure {
  let shapesNunber = Object.keys(Shapes).length;
  let rakdomShapeIndex = Math.floor(Math.random() * shapesNunber);
  let randomShapeKey = Object.keys(Shapes)[rakdomShapeIndex];
  return cloneDeep(Shapes[randomShapeKey]);
}
