import { boardSideSchema } from 'game_engine';
import { TContext } from './context';

export const context: TContext = {
  iterator: 0,
  game: {
    moves: 0,
    score: 0,
    board: [1024],
    boardSide: boardSideSchema.parse(5),
    status: 'idle',
  },
  errors: [],
};
