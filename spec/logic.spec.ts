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
      figuresSet: {
        current: {
          form: FigureForm.Square,
          blocks: [{ x: 1, y: 1, color: 0 }],
          centralBlockIndex: 0
        },
        next: null
      },
      board: { width: 10, height: 10, fragments: [] },
      isOver: false
    };
    expect(
      isFigureLandedOnBottom(game.figuresSet.current, game.board)
    ).toBeFalsy();
  });
  it("should return true for shape in the bottom", () => {
    let game: Partial<Game> = {
      figuresSet: {
        current: {
          form: FigureForm.Square,
          blocks: [{ x: 1, y: 9, color: 0 }],
          centralBlockIndex: 0
        },
        next: null
      },
      board: { width: 10, height: 10, fragments: [] }
    };
    expect(
      isFigureLandedOnBottom(game.figuresSet.current, game.board)
    ).toBeTruthy();
  });
});
