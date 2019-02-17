import * as t from "io-ts";
import { BlockIO } from "./block";

export const CanvasIO = t.type({
  blocks: t.array(BlockIO)
});

export type Canvas = t.TypeOf<typeof CanvasIO>;
