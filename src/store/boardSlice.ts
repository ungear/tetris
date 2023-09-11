import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Board } from '../../typing/board'
import { Block } from '../../typing/block'
import { NEXT_FIGURE_OFFSET, destroyRow, getBoardFragmentByCoords, isFigureLandedOnBottom, isFigureLandedOnFragment } from './helpers'
import { Figure } from '../../typing/figure'
import { rotateFigure } from '../figure'
import { cloneDeep } from 'lodash'
import { getNewShape } from '../logic'

const initialState: Board = {
  width: 0,
  height: 0,
  fragments: [],
  currentFigure: null,
  nextFigure: null,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardSize: (state, action: PayloadAction<{ width: number, height: number }>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    addFragments: (state, action: PayloadAction<{fragments: Block[]}>) => {
      state.fragments = state.fragments.slice().concat(action.payload.fragments)
    },
    handleFullRows: (state, action: PayloadAction<{rowsYcoords: number[]}>) => {
      // delete blocks in specified rows
      action.payload.rowsYcoords.forEach(y => destroyRow(state, y));

      // move down rows abowe deleted
      action.payload.rowsYcoords.forEach(deletedRowY =>
        state.fragments.filter(b => b.y < deletedRowY).forEach(b => b.y++)
      );
    },

    moveCurrentFigureDown: (state) => {
      moveDown(state);
    },

    moveCurrentFigureLeft: (state) => {
      moveLeft(state);
    },

    moveCurrentFigureRight: (state) => {
      moveRight(state);
    },

    rotateCurrentFigure: (state) => {
      rotate(state);
    },

    launchNewFigure: (state, action: PayloadAction<Figure>) => {
      const figure = cloneDeep(action.payload);
      figure.blocks.forEach(b => {
        b.x = b.x + state.width / 2 + NEXT_FIGURE_OFFSET;
      });
      state.currentFigure = figure;
    },

    generateNewFigure: (state) => {
      const maxExistingBlockId = state.nextFigure && state.nextFigure.blocks 
        ? Math.max(...state.nextFigure.blocks.map(b => b.id))
        : 0;
      const newShape = getNewShape(state.width, maxExistingBlockId);
      newShape.blocks.forEach(b => {
        b.x = b.x - state.width / 2 - NEXT_FIGURE_OFFSET;
      });
      state.nextFigure = newShape;
    }
  },
})

export const { 
  addFragments, 
  handleFullRows, 
  setBoardSize, 
  moveCurrentFigureDown,
  moveCurrentFigureLeft,
  moveCurrentFigureRight,
  rotateCurrentFigure,
  launchNewFigure,
  generateNewFigure,
} = boardSlice.actions
export default boardSlice.reducer

function moveLeft(board: Board): void {
  const figure = board.currentFigure;
  const isShapeNearLeftBorder = figure.blocks.filter(b => b.x === 0).length > 0;
  const willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x - 1, y: b.y })
    ).length > 0;
  const canBeMoved = !isShapeNearLeftBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    figure.blocks.forEach(b => ({ ...b, x: --b.x }))
  }
}

function moveRight(board: Board): void {
  const figure = board.currentFigure;
  const isShapeNearRightBorder =
    figure.blocks.filter(b => b.x === board.width - 1).length > 0;
    const willShapeIntersectFragments =
    figure.blocks.filter(
      b => !!getBoardFragmentByCoords({ board, x: b.x + 1, y: b.y })
    ).length > 0;
  const canBeMoved = !isShapeNearRightBorder && !willShapeIntersectFragments;
  if (canBeMoved) {
    figure.blocks.forEach(b => ({ ...b, x: ++b.x  }))
  }
}

function moveDown(board: Board): void {
  const figure = board.currentFigure;
  const isAboveFragment = isFigureLandedOnFragment(figure, board);
  const isAboveBottom = isFigureLandedOnBottom(figure, board);
  const canBeMoved = !isAboveFragment && !isAboveBottom;
  if (canBeMoved) {
    figure.blocks.forEach(b => ({ ...b, y: ++b.y }))
  }
}

function rotate(board: Board): void {
  const originalFigure = board.currentFigure;
  const rotatedFigure = cloneDeep(originalFigure);
  rotateFigure(rotatedFigure);
  const isIntersectFragments = rotatedFigure.blocks.some(
    b => !!getBoardFragmentByCoords({ board, x: b.x, y: b.y })
  );

  const isBeyondLeftBorder = rotatedFigure.blocks.some(b => b.x < 0);
  const isBeyondRightBorder = rotatedFigure.blocks.some(
    b => b.x > board.width - 1
  );
  const canBeRotated =
    !isIntersectFragments && !isBeyondLeftBorder && !isBeyondRightBorder;

  if(canBeRotated){
    board.currentFigure = rotatedFigure;
  }
}
