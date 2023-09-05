import { Block } from "./block";

export interface Board {
  fragments: Block[],
  width: number,
  height: number
}
