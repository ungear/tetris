import { Figure } from "./figure";
import { Board } from "./board";

export type Game = {
  figure: Figure;
  board: Board;
  isOver: boolean;
  score: number;
};
