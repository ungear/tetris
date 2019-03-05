import {
  BOARD_ADD_FRAGMENTS,
  BoardAddFragmentsAction,
  BOARD_HANDLE_FULL_ROWS,
  BoardHandleFullRowsAction
} from "../types";
import { Board } from "../../../typing/board";
import { Game } from "../../../typing/game";
import { destroyRow } from "../helpers";
import { cloneDeep } from "lodash";

export function boardReducer(state: Game = {} as Game, action: any): Board {
  switch (action.type) {
    case BOARD_ADD_FRAGMENTS:
      return addFragments(state.board, action);
    case BOARD_HANDLE_FULL_ROWS:
      return handleFullRows(state.board, action);
    default:
      return state.board;
  }
}

function addFragments(state: Board, action: BoardAddFragmentsAction): Board {
  let f = {
    ...state,
    fragments: state.fragments.slice().concat(action.fragments)
  };

  return {
    ...state,
    fragments: state.fragments.slice().concat(action.fragments)
  };
}

function handleFullRows(
  state: Board,
  action: BoardHandleFullRowsAction
): Board {
  let board = cloneDeep(state);

  // delete blocks in specified rows
  action.rowsYcoords.forEach(y => destroyRow(board, y));

  // move down rows abowe deleted
  action.rowsYcoords.forEach(deletedRowY =>
    board.fragments.filter(b => b.y < deletedRowY).forEach(b => b.y++)
  );

  return board;
}
