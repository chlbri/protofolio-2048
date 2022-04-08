import { BoardSide, contextSchema as context, inferF } from 'game_engine';
import {
  array,
  boolean,
  literal,
  number,
  object,
  string,
  union,
} from 'zod';

export const contextSchema = (boardSide: BoardSide) =>
  object({
    errors: array(string()),
    game: context(boardSide)
      .omit({ _tempBoards: true, iterator: true })
      .extend({
        status: union([
          literal('idle'),
          literal('started'),
          literal('stopped'),
        ]),
      }),
    isMobile: boolean(),
    iterator: number(),
  });
// context(boardSide)
//   .omit({ _tempBoards: true })
//   .extend({
//     errors: array(string()),
//   });

export type TContext = inferF<typeof contextSchema>;
