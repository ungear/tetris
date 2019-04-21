import * as t from "io-ts";
import { BlockIO } from "./block";

export enum FigureForm {
  Square = "Square",
  Cripple = "Cripple",
  CrippleRev = "CrippleRev",
  Pipe = "Pipe",
  PipeRev = "PipeRev",
  Sausage = "Sausage",
  Cross = "Cross"
}

const FigureFormV = t.keyof({
  [FigureForm.Square]: null,
  [FigureForm.Cripple]: null,
  [FigureForm.CrippleRev]: null,
  [FigureForm.Pipe]: null,
  [FigureForm.PipeRev]: null,
  [FigureForm.Sausage]: null,
  [FigureForm.Cross]: null
});

export const FigureIO = t.type({
  centralBlockIndex: t.number,
  blocks: t.array(BlockIO),
  form: FigureFormV
});

export type Figure = t.TypeOf<typeof FigureIO>;

export type FiguresSet = {
  current: Figure;
  next: Figure;
};
