import { Shape } from "./shape";
import { Board } from "./board";

export type Game = {
  shape: Shape;
  board: Board;
  isOver: boolean;
};
