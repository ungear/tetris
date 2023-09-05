import { Block } from "./block";

export enum FigureForm {
  Square = "Square",
  Cripple = "Cripple",
  CrippleRev = "CrippleRev",
  Pipe = "Pipe",
  PipeRev = "PipeRev",
  Sausage = "Sausage",
  Cross = "Cross"
}

export interface  Figure {
  centralBlockIndex: number,
  blocks: Block[],
  form: FigureForm
}

export type FiguresSet = {
  current: Figure;
  next: Figure;
};
