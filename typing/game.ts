import { Figure } from "./figure";
import { Board } from "./board";

export type Game = {
  currentFigure: Figure,
  nextFigure: Figure,
  board: Board;
  isOver: boolean;
  score: number;
};
