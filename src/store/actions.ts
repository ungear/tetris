export const score_add = "score_add";
export function scoreAdd(extra: number) {
  return { type: score_add, extra };
}
