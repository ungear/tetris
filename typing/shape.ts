import * as t from "io-ts";
import { BlockIO } from "./block";

export const ShapeIO = t.type({
  blocks: t.array(BlockIO)
});

export type Shape = t.TypeOf<typeof ShapeIO>;
