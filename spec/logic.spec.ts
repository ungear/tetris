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

describe("getYcoordsOfFullRows", () => {
  let board: Board;
  beforeEach(() => {
    board = {
      width: 4,
      height: 4,
      fragments: [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }]
    };
  });
  it("should return an empty array if there are no completed rows", () => {
    expect(getYcoordsOfFullRows(board)).toEqual([]);
  });
  it("should return an array with a row index if one row is full", () => {
    board.fragments.push({ x: 3, y: 3 });
    expect(getYcoordsOfFullRows(board)).toEqual([3]);
  });
  it("should return an array with two row indexes if there are two full rows", () => {
    board.fragments.push({ x: 3, y: 3 });
    board.fragments.push({ x: 0, y: 2 });
    board.fragments.push({ x: 1, y: 2 });
    board.fragments.push({ x: 2, y: 2 });
    board.fragments.push({ x: 3, y: 2 });
    expect(getYcoordsOfFullRows(board)).toEqual([2, 3]);
  });
});
