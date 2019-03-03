import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Game } from "../typing/game";

import { getNewShape, getYcoordsOfFullRows } from "../src/logic";

import { isFigureLandedOnBottom } from "../src/store/helpers";

import { from } from "rxjs";
describe("isFigureLandedOnBottom", () => {
  it("should return false for shape not in the bottom", () => {
    let game: Partial<Game> = {
      figure: {
        form: FigureForm.Square,
        blocks: [{ x: 1, y: 1 }]
      },
      board: { width: 10, height: 10, fragments: [] },
      isOver: false
    };
    expect(isFigureLandedOnBottom(game.figure, game.board)).toBeFalsy();
  });
  it("should return true for shape in the bottom", () => {
    let game: Partial<Game> = {
      figure: {
        form: FigureForm.Square,
        blocks: [{ x: 1, y: 9 }]
      },
      board: { width: 10, height: 10, fragments: [] }
    };
    expect(isFigureLandedOnBottom(game.figure, game.board)).toBeTruthy();
  });
});
