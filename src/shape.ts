import { Shape, ShapeForm } from "../typing/shape";
import { cloneDeep } from "lodash";

const Shapes: { [key: string]: Shape } = {
  [ShapeForm.Square]: {
    form: ShapeForm.Square,
    blocks: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
  },
  [ShapeForm.Sausage]: {
    form: ShapeForm.Square,
    blocks: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
  }
};

export function getRandomShapeDraft(): Shape {
  return cloneDeep(Shapes[ShapeForm.Square]);
}
