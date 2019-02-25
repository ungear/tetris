import { Block, BlockIO } from "../typing/block";
import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Game } from "../typing/game";
import { getYcoordsOfFullRows } from "../src/logic";

describe("getYcoordsOfFullRows", () => {
  let board: Board;
  beforeEach(() => {
    board = {
      width: 4,
      height: 5,
      fragments: []
    };
  });
  it("should return an empty array for an empty board", () => {
    expect(getYcoordsOfFullRows(board)).toEqual([]);
  });
  it("should return an index in case of f....", () => {
    fillRowWithIndex(board, 4);
    expect(getYcoordsOfFullRows(board)).toEqual([4]);
  });
  it("should return an index in case of .f...", () => {
    fillRowWithIndex(board, 3);
    expect(getYcoordsOfFullRows(board)).toEqual([3]);
  });
  it("should return an index in case of ..f..", () => {
    fillRowWithIndex(board, 2);
    expect(getYcoordsOfFullRows(board)).toEqual([2]);
  });
  it("should return an index in case of ...f.", () => {
    fillRowWithIndex(board, 1);
    expect(getYcoordsOfFullRows(board)).toEqual([1]);
  });
  it("should return indexes in case of ff...", () => {
    fillRowWithIndex(board, 3);
    fillRowWithIndex(board, 4);
    expect(getYcoordsOfFullRows(board)).toEqual([3, 4]);
  });
  it("should return indexes in case of fff..", () => {
    fillRowWithIndex(board, 2);
    fillRowWithIndex(board, 3);
    fillRowWithIndex(board, 4);
    expect(getYcoordsOfFullRows(board)).toEqual([2, 3, 4]);
  });
  it("should return indexes in case of ffff.", () => {
    fillRowWithIndex(board, 1);
    fillRowWithIndex(board, 2);
    fillRowWithIndex(board, 3);
    fillRowWithIndex(board, 4);
    expect(getYcoordsOfFullRows(board)).toEqual([1, 2, 3, 4]);
  });
  it("should return an index in case of f.f..", () => {
    fillRowWithIndex(board, 4);
    fillRowWithIndex(board, 2);
    expect(getYcoordsOfFullRows(board)).toEqual([2, 4]);
  });
  it("should return an index in case of .f.f.", () => {
    fillRowWithIndex(board, 1);
    fillRowWithIndex(board, 3);
    expect(getYcoordsOfFullRows(board)).toEqual([1, 3]);
  });
  it("should return an index in case of .ff..", () => {
    fillRowWithIndex(board, 2);
    fillRowWithIndex(board, 3);
    expect(getYcoordsOfFullRows(board)).toEqual([2, 3]);
  });
  it("should return an empty array in case of p....", () => {
    board.fragments.push({ x: 1, y: 4 });
    expect(getYcoordsOfFullRows(board)).toEqual([]);
  });
  it("should return an empty array in case of pp...", () => {
    board.fragments.push({ x: 1, y: 4 });
    board.fragments.push({ x: 1, y: 3 });
    expect(getYcoordsOfFullRows(board)).toEqual([]);
  });
  it("should return an empty array in case of ppp..", () => {
    board.fragments.push({ x: 1, y: 4 });
    board.fragments.push({ x: 1, y: 3 });
    board.fragments.push({ x: 1, y: 2 });
    expect(getYcoordsOfFullRows(board)).toEqual([]);
  });
  it("should return an empty array in case of pppp.", () => {
    board.fragments.push({ x: 1, y: 4 });
    board.fragments.push({ x: 1, y: 3 });
    board.fragments.push({ x: 1, y: 2 });
    board.fragments.push({ x: 1, y: 1 });
    expect(getYcoordsOfFullRows(board)).toEqual([]);
  });
  it("should return an index in case of fp...", () => {
    board.fragments.push({ x: 1, y: 3 });
    fillRowWithIndex(board, 4);
    expect(getYcoordsOfFullRows(board)).toEqual([4]);
  });
  it("should return an index in case of pf...", () => {
    board.fragments.push({ x: 1, y: 4 });
    fillRowWithIndex(board, 3);
    expect(getYcoordsOfFullRows(board)).toEqual([3]);
  });
  it("should return an index in case of fpf..", () => {
    board.fragments.push({ x: 1, y: 3 });
    fillRowWithIndex(board, 4);
    fillRowWithIndex(board, 2);
    expect(getYcoordsOfFullRows(board)).toEqual([2, 4]);
  });
  it("should return an index in case of pfp..", () => {
    board.fragments.push({ x: 1, y: 4 });
    board.fragments.push({ x: 1, y: 2 });
    fillRowWithIndex(board, 3);
    expect(getYcoordsOfFullRows(board)).toEqual([3]);
  });
});

function fillRowWithIndex(board: Board, rowIndex: number) {
  for (let i = 0; i < board.width; i++) {
    board.fragments.push({ x: i, y: rowIndex });
  }
}
