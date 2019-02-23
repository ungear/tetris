import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";
import { Game } from "../typing/game";

import {
  getBoardFragmentByCoords,
  getNewShape,
  isShapeLandedOnFragment,
  isShapeLandedOnBottom,
  moveShapeDown,
  moveShapeLeft,
  moveShapeRight,
  getYcoordsOfFullRows
} from "../src/logic";

describe("isShapeLandedOnBottom", () => {
  it("should return false for shape not in the bottom", () => {
    let game: Partial<Game> = {
      shape: {
        form: ShapeForm.Square,
        blocks: [{ x: 1, y: 1 }]
      },
      board: { width: 10, height: 10, fragments: [] },
      isOver: false
    };
    expect(isShapeLandedOnBottom(game as Game)).toBeFalsy();
  });
  it("should return true for shape in the bottom", () => {
    let game: Partial<Game> = {
      shape: {
        form: ShapeForm.Square,
        blocks: [{ x: 1, y: 9 }]
      },
      board: { width: 10, height: 10, fragments: [] }
    };
    expect(isShapeLandedOnBottom(game as Game)).toBeTruthy();
  });
});
