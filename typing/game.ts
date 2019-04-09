import { FiguresSet } from "./figure";
import { Board } from "./board";

export type Game = {
  figuresSet: FiguresSet;
  board: Board;
  isOver: boolean;
  score: number;
};
