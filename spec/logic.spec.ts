import { FigureForm } from "../typing/figure";
import { Game } from "../typing/game";
import { isFigureLandedOnBottom } from "../src/store/helpers";

describe("isFigureLandedOnBottom", () => {
  it("should return false for shape not in the bottom", () => {
    let game: Partial<Game> = {
      currentFigure: {
        form: FigureForm.Square,
          blocks: [{ x: 1, y: 1, color: 0 }],
          centralBlockIndex: 0
      },
      nextFigure: null,
      board: { width: 10, height: 10, fragments: [] },
      isOver: false
    };
    expect(
      isFigureLandedOnBottom(game.currentFigure, game.board)
    ).toBeFalsy();
  });
  it("should return true for shape in the bottom", () => {
    let game: Partial<Game> = {
      currentFigure: {
        form: FigureForm.Square,
        blocks: [{ x: 1, y: 9, color: 0 }],
        centralBlockIndex: 0
      },
      nextFigure: null,
      board: { width: 10, height: 10, fragments: [] }
    };
    expect(
      isFigureLandedOnBottom(game.currentFigure, game.board)
    ).toBeTruthy();
  });
});
