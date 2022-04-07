import { TEvent as TSEvent } from 'game_engine';
import { send } from 'xstate';
import { TContext } from '../../context';
import { TEvent } from '../../events';

export const startEngine = send<
  TContext,
  TEvent | { type: 'xstate.init' },
  TSEvent
>('START', {
  to: 'engine',
});

export const moveDown = send<TContext, TEvent, TSEvent>('MOVE.DOWN', {
  to: 'engine',
});

export const moveLeft = send<TContext, TEvent, TSEvent>('MOVE.LEFT', {
  to: 'engine',
});

export const moveRight = send<TContext, TEvent, TSEvent>('MOVE.RIGHT', {
  to: 'engine',
});

export const moveUp = send<TContext, TEvent, TSEvent>('MOVE.UP', {
  to: 'engine',
});
