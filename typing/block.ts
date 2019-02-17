import * as t from "io-ts";

export const BlockIO = t.type({
  x: t.number,
  y: t.number
});

export type Block = t.TypeOf<typeof BlockIO>;
