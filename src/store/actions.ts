import { ScoreAddAction, SCORE_ADD } from "./types";

export function scoreAdd(scoreGained: number): ScoreAddAction {
  return { type: SCORE_ADD, scoreGained };
}
