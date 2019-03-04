import {
  BOARD_ADD_FRAGMENTS,
  BoardAddFragmentsAction,
  BOARD_HANDLE_FULL_ROWS,
  BoardHandleFullRowsAction
} from "../types";
import { Block } from "../../../typing/block";

export function boardAddFragments(fragments: Block[]): BoardAddFragmentsAction {
  return { type: BOARD_ADD_FRAGMENTS, fragments };
}

export function boardHandleFullRows(
  rowsYcoords: number[]
): BoardHandleFullRowsAction {
  return { type: BOARD_HANDLE_FULL_ROWS, rowsYcoords };
}
