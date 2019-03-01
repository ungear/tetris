export const SCORE_ADD = "SCORE_ADD";

export interface ScoreAddAction {
  type: typeof SCORE_ADD;
  scoreGained: number;
}

export interface GameState {
  score: number;
}
