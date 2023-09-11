import { FigureForm } from "../typing/figure";
import { Game } from "../typing/game";
import { isFigureLandedOnBottom } from "../src/store/helpers";

describe("isFigureLandedOnBottom", () => {
  it("should return false for shape not in the bottom", () => {
    const game: Partial<Game> = {
      board: { 
        width: 10, 
        height: 10, 
        fragments: [],
        currentFigure: {
          form: FigureForm.Square,
            blocks: [{ x: 1, y: 1, color: 0 }],
            centralBlockIndex: 0
        },
        nextFigure: null,
       },
      isOver: false
    };
    expect(
      isFigureLandedOnBottom(game.board.currentFigure, game.board)
    ).toBeFalsy();
  });
  it("should return true for shape in the bottom", () => {
    const game: Partial<Game> = {
      board: { 
        width: 10, 
        height: 10, 
        fragments: [],
        currentFigure: {
          form: FigureForm.Square,
          blocks: [{ x: 1, y: 9, color: 0 }],
          centralBlockIndex: 0
        },
        nextFigure: null,
      }
    };
    expect(
      isFigureLandedOnBottom(game.board.currentFigure, game.board)
    ).toBeTruthy();
  });
});
