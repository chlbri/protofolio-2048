import { boardSideSchema } from 'game_engine';
import { TContext } from './context';

export const context: TContext = {
  iterator: 0,
  game: {
    moves: 0,
    score: 0,
    board: [],
    boardSide: boardSideSchema.parse(4),
    status: 'idle',
  },
  isMobile: false,
  errors: [],
};
