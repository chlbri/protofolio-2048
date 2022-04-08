import { InterpreterFrom, StateFrom } from 'xstate';
import { machine } from './machine';

export type Machine = typeof machine;
export type Interpreter = InterpreterFrom<Machine>;
export type State = StateFrom<Machine>;
