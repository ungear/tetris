import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Board } from '../../typing/board'
import { Block } from '../../typing/block'
import { NEXT_FIGURE_OFFSET, destroyRow } from './helpers'
import { getNewShape } from '../logic'
import { moveDown, moveLeft, moveRight, rotate } from './boardHandlers'

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

    launchNewFigure: (state) => {
      state.nextFigure.blocks.forEach(b => {
        b.x = b.x + state.width / 2 + NEXT_FIGURE_OFFSET;
      });
      state.currentFigure = state.nextFigure;
    },

    generateNextFigure: (state) => {
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
  generateNextFigure,
} = boardSlice.actions
export default boardSlice.reducer

