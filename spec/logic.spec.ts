import { Block, BlockIO } from "../typing/block";
import { Shape, ShapeForm } from "../typing/shape";
import { Board } from "../typing/board";
import { Game } from "../typing/game";

import {
  getBoardFragmentByCoords,
  getNewShape,
  isShapeLandedOnFragment,
  isShapeLandedOnBottom,
  moveShapeDown
} from "../src/logic";

describe("isShapeLandedOnBottom", () => {
  it("should return false for shape not in the bottom", () => {
    let game: Game = {
      shape: {
        form: ShapeForm.Square,
        blocks: [{ x: 1, y: 1 }]
      },
      board: { width: 10, height: 10, fragments: [] },
      isOver: false
    };
    expect(isShapeLandedOnBottom(game)).toBeFalsy();
  });
  it("should return true for shape in the bottom", () => {
    let game: Game = {
      shape: {
        form: ShapeForm.Square,
        blocks: [{ x: 1, y: 9 }]
      },
      board: { width: 10, height: 10, fragments: [] },
      isOver: false
    };
    expect(isShapeLandedOnBottom(game)).toBeTruthy();
  });
});
