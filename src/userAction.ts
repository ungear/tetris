export enum UserAction {
  Left = "Left",
  Right = "Right",
  Down = "Down",
  Rotate = "Rotate"
}

const UserActionByKey: { [key: string]: UserAction } = {
  ArrowUp: UserAction.Rotate,
  ArrowRight: UserAction.Right,
  ArrowDown: UserAction.Down,
  ArrowLeft: UserAction.Left,
  w: UserAction.Rotate,
  d: UserAction.Right,
  s: UserAction.Down,
  a: UserAction.Left
};

export function getUserActionByKey(key: string): UserAction {
  return UserActionByKey[key];
}
