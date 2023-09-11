import { Board } from "./board";

export type Game = {
  board: Board;
  isOver: boolean;
  score: number;
};
