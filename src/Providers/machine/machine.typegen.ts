// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    addNotEnvVariablesError: 'error.platform.checkEnvironmentVariables';
    updateGame: 'GAME.UPDATE';
    inc: 'GAME.UPDATE';
    startGame: 'GAME.START';
    startEngine: 'GAME.START';
    stopGame: 'GAME.STOP';
    moveDown: 'GAME.MOVE.DOWN';
    moveLeft: 'GAME.MOVE.LEFT';
    moveRight: 'GAME.MOVE.RIGHT';
    moveUp: 'GAME.MOVE.UP';
    changeBoardSide: 'GAME.CHANGE_BOARDSIDE';
    sendBoardSide: 'GAME.CHANGE_BOARDSIDE';
    reStartGame: 'GAME.RESTART';
    assignIsMobile: 'done.invoke.main.preparing:invocation[0]';
  };
  internalEvents: {
    'error.platform.checkEnvironmentVariables': {
      type: 'error.platform.checkEnvironmentVariables';
      data: unknown;
    };
    'done.invoke.main.preparing:invocation[0]': {
      type: 'done.invoke.main.preparing:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.checkEnvironmentVariables': {
      type: 'done.invoke.checkEnvironmentVariables';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
    'done.invoke.engine': {
      type: 'done.invoke.engine';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.engine': {
      type: 'error.platform.engine';
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    checkEnvironmentVariables: 'done.invoke.checkEnvironmentVariables';
    prepare: 'done.invoke.main.preparing:invocation[0]';
    engine: 'done.invoke.engine';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    checkEnvironmentVariables: 'START';
    prepare: 'done.invoke.checkEnvironmentVariables';
    engine: 'xstate.init';
  };
  eventsCausingGuards: {
    hasEnvErrors: 'error.platform.checkEnvironmentVariables';
    gameIsNotStarted: 'GAME.START';
    gameIsStarted: 'GAME.STOP' | 'GAME.RESTART';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'checkingEnvVariables'
    | 'preparing'
    | 'starting'
    | 'started'
    | 'started.engine'
    | 'started.engine.busy'
    | 'started.engine.nobusy'
    | 'started.engine.gameover'
    | { started?: 'engine' | { engine?: 'busy' | 'nobusy' | 'gameover' } };
  tags: never;
}
