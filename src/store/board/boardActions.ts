import { BOARD_ADD_FRAGMENTS, BoardAddFragmentsAction } from "../types";
import { Block } from "../../../typing/block";

export function boardAddFragments(fragments: Block[]): BoardAddFragmentsAction {
  return { type: BOARD_ADD_FRAGMENTS, fragments };
}
