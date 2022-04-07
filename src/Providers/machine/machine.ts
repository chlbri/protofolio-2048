import { assign } from '@xstate/immer';
import { engine } from 'game_engine';
import { createMachine, send } from 'xstate';
import { TContext } from './context';
import { context } from './context/default';
import { TEvent } from './events';

export const mainMachine = createMachine(
  {
    context,
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      events: {} as TEvent,
      context: {} as TContext,
    },
    id: 'main',
    initial: 'idle',
    states: {
      idle: {
        exit: 'inc',
        description: 'When the app is not launched',
        on: {
          START: {
            target: 'checkingEnvVariables',
          },
        },
      },
      checkingEnvVariables: {
        exit: 'inc',
        description: 'If you have env variables to load, you check each',
        invoke: {
          id: 'checkEnvironmentVariables',
          src: 'checkEnvironmentVariables',
          onDone: [
            {
              target: 'preparing',
            },
          ],
          onError: [
            {
              cond: 'hasEnvErrors',
              actions: 'addNotEnvVariablesError',
            },
          ],
        },
      },
      preparing: {
        exit: 'inc',
        description: 'Computer memory checking',
        invoke: {
          src: 'prepare',
          onDone: {
            target: 'starting',
          },
        },
      },
      starting: {
        after: {
          500: 'started',
        },
      },
      started: {
        exit: 'inc',
        type: 'parallel',
        states: {
          engine: {
            entry: ['startEngine'],
            invoke: {
              id: 'engine',
              src: 'engine',
              data: {
                boardSide: (ctx: TContext) => ctx.game.boardSide,
              },
            },
            on: {
              'GAME.MOVE.DOWN': {
                actions: 'moveDown',
              },
              'GAME.MOVE.LEFT': {
                actions: 'moveLeft',
              },
              'GAME.MOVE.RIGHT': {
                actions: 'moveRight',
              },
              'GAME.MOVE.UP': {
                actions: 'moveUp',
              },
              'GAME.UPDATE': {
                actions: 'updateGame',
              },
              'GAME.START': {
                cond: 'gameIsNotStarted',
                actions: ['startGame', 'startEngine'],
              },
              'GAME.STOP': {
                cond: 'gameIsStarted',
                actions: 'stopGame',
              },
              'GAME.CHANGE_BOARDSIDE': {
                actions: ['changeBoardSide', 'sendBoardSide'],
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      startEngine: send('START', {
        to: 'engine',
      }),
      changeBoardSide: assign((ctx, { boardSide }) => {
        ctx.game.boardSide = boardSide;
      }),
      sendBoardSide: send(
        (_, { boardSide }) => ({
          type: 'CHANGE_BOARDSIDE',
          boardSide,
        }),
        {
          to: 'engine',
        },
      ),
      startGame: assign(ctx => {
        ctx.game.status = 'started';
      }),
      stopGame: assign(ctx => {
        ctx.game.status = 'stopped';
      }),
      moveUp: send('MOVE.UP', {
        to: 'engine',
      }),
      moveDown: send('MOVE.DOWN', {
        to: 'engine',
      }),
      moveLeft: send('MOVE.LEFT', {
        to: 'engine',
      }),
      moveRight: send('MOVE.RIGHT', {
        to: 'engine',
      }),
      updateGame: assign((ctx, ev) => {
        ctx.game.board = ev.board;
        ctx.game.moves = ev.moves;
        ctx.game.statistics = ev.statistics;
        ctx.game.score = ev.score;
      }),
      inc: assign(ctx => {
        ctx.iterator = ctx.iterator + 1;
      }),
      addNotEnvVariablesError: assign(ctx => {
        ctx.errors.push('envError');
      }),
    },
    guards: {
      hasEnvErrors: ctx => !ctx.errors.includes('envError'),
      gameIsNotStarted: ctx => ctx.game.status !== 'started',
      gameIsStarted: ctx => ctx.game.status === 'started',
    },
    services: {
      engine,
      checkEnvironmentVariables: async () => {},
      prepare: async () => {},
    },
  },
);
