import * as t from "io-ts";
import { BlockIO } from "./block";

export const BoardIO = t.type({
  blocks: t.array(BlockIO),
  width: t.number,
  height: t.number,
});

export type Board = t.TypeOf<typeof BoardIO>;
