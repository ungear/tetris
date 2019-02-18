import * as t from "io-ts";
import { BlockIO } from "./block";

export enum ShapeForm {
  Square = "Square",
  Cripple = "Cripple",
  CrippleRev = "CrippleRev",
  Pipe = "Pipe",
  PipeRev = "PipeRev",
  Sausage = "Sausage",
  Cross = "Cross"
}

const ShapeFormV = t.keyof({
  [ShapeForm.Square]: null,
  [ShapeForm.Cripple]: null,
  [ShapeForm.CrippleRev]: null,
  [ShapeForm.Pipe]: null,
  [ShapeForm.PipeRev]: null,
  [ShapeForm.Sausage]: null,
  [ShapeForm.Cross]: null
});

export const ShapeIO = t.type({
  blocks: t.array(BlockIO),
  form: ShapeFormV
});

export type Shape = t.TypeOf<typeof ShapeIO>;
