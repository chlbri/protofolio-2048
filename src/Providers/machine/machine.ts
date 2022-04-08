import { assign } from '@xstate/immer';
import { engine } from 'game_engine';
import MobileDetect from 'mobile-detect';
import { createMachine, send } from 'xstate';
import { TContext } from './context';
import { context } from './context/default';
import { TEvent } from './events';

export const machine = createMachine(
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
        entry: 'assignIsMobile',
        after: {
          500: 'started',
        },
        exit: ['inc'],
      },
      started: {
        exit: 'inc',
        initial: 'engine',
        states: {
          engine: {
            id: 'engine',
            entry: ['startEngine'],
            invoke: {
              id: 'engine',
              src: 'engine',
              data: (ctx: TContext) => {
                return {
                  board: ctx.game.board,
                  boardSide: ctx.game.boardSide,
                  iterator: 0,
                  moves: 0,
                  score: 0,
                  _tempBoards: {
                    down: [],
                    up: [],
                    left: [],
                    right: [],
                    next: [],
                  },
                };
              },
            },
            initial: 'busy',
            states: {
              busy: {
                after: { '500': 'nobusy' },
              },
              nobusy: {},
              gameover: {},
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
                actions: ['updateGame', 'inc'],
              },
              'GAME.START': {
                cond: 'gameIsNotStarted',
                actions: ['startGame', 'startEngine'],
                target: '.busy',
              },
              'GAME.RESTART': {
                cond: 'gameIsStarted',
                actions: ['reStartGame'],
                target: '.busy',
              },
              'GAME.STOP': {
                cond: 'gameIsStarted',
                actions: 'stopGame',
                target: '.gameover',
              },
              'GAME.CHANGE_BOARDSIDE': {
                actions: ['changeBoardSide', 'sendBoardSide'],
                target: '.busy',
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
        ({ game: { boardSide: b2 } }, { boardSide }) => ({
          type: 'CHANGE_BOARDSIDE',
          boardSide: boardSide ?? b2,
        }),
        {
          to: 'engine',
        },
      ),
      reStartGame: send('RESTART', { to: 'engine' }),
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
        ctx.game.moves = ev.moves ?? 0;
        ctx.game.statistics = ev.statistics;
        ctx.game.score = ev.score;
      }),
      inc: assign(ctx => {
        ctx.iterator = ctx.iterator + 1;
      }),
      addNotEnvVariablesError: assign(ctx => {
        ctx.errors.push('envError');
      }),
      assignIsMobile: assign(ctx => {
        const md = new MobileDetect(window.navigator.userAgent);
        ctx.isMobile = !!md.mobile();
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
      //TODO: Connexion
    },
  },
);
