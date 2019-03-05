import { ScoreAddAction, SCORE_ADD, GAME_OVER, GameOverAction } from "./types";

export function scoreAdd(scoreGained: number): ScoreAddAction {
  return { type: SCORE_ADD, scoreGained };
}

export function gameOver(): GameOverAction {
  return { type: GAME_OVER };
}
