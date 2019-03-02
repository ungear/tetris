import {
  BOARD_ADD_FRAGMENTS,
  BoardAddFragmentsAction,
  GameState
} from "../types";
import { Board } from "../../../typing/board";

export function boardReducer(
  state: GameState = {} as GameState,
  action: any
): Board {
  switch (action.type) {
    case BOARD_ADD_FRAGMENTS:
      return addFragments(state.board, action);
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
