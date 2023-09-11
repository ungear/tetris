import { Block } from "./block";
import { Figure } from "./figure";

export interface Board {
  fragments: Block[],
  width: number,
  height: number,
  currentFigure: Figure,
  nextFigure: Figure,
}
