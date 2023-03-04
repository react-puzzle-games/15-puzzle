export const GAME_IDLE = Symbol("GAME_IDLE");
export const GAME_STARTED = Symbol("GAME_STARTED");
export const GAME_OVER = Symbol("GAME_OVER");
export const GAME_PAUSED = Symbol("GAME_PAUSED");

export type GameStatus =
  | typeof GAME_IDLE
  | typeof GAME_STARTED
  | typeof GAME_OVER
  | typeof GAME_PAUSED;
