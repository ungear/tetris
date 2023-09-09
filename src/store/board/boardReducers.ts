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
import { Action } from "redux";

export function boardReducer(state: Game = {} as Game, action: Action): Board {
  switch (action.type) {
    case BOARD_ADD_FRAGMENTS:
      return addFragments(state.board, action as BoardAddFragmentsAction);
    case BOARD_HANDLE_FULL_ROWS:
      return handleFullRows(state.board, action as BoardHandleFullRowsAction);
    default:
      return state.board;
  }
}

function addFragments(state: Board, action: BoardAddFragmentsAction): Board {
  return {
    ...state,
    fragments: state.fragments.slice().concat(action.fragments)
  };
}

function handleFullRows(
  state: Board,
  action: BoardHandleFullRowsAction
): Board {
  const board = cloneDeep(state);

  // delete blocks in specified rows
  action.rowsYcoords.forEach(y => destroyRow(board, y));

  // move down rows abowe deleted
  action.rowsYcoords.forEach(deletedRowY =>
    board.fragments.filter(b => b.y < deletedRowY).forEach(b => b.y++)
  );

  return board;
}
