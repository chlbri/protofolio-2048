import { BoardSide, TContext } from 'game_engine';

export type UPDATE_GAME_EVENT = { type: 'GAME.UPDATE' } & Omit<
  TContext,
  'boardSide' | 'iterator'
>;

export type CHANGE_BOARDSIDE_EVENT = {
  type: 'GAME.CHANGE_BOARDSIDE';
  boardSide: BoardSide;
};

export type TEvent =
  | {
      type:
        | 'START'
        | 'GAME.START'
        | 'GAME.RESTART'
        | 'GAME.STOP'
        | 'GAME.MOVE.UP'
        | 'GAME.MOVE.DOWN'
        | 'GAME.MOVE.DOWN'
        | 'GAME.MOVE.LEFT'
        | 'GAME.MOVE.RIGHT'
        | 'LOGIN.EMAIL_PASSWORD'
        | 'REGISTER.EMAIL_PASSWORD';
    }
  | UPDATE_GAME_EVENT
  | CHANGE_BOARDSIDE_EVENT;
