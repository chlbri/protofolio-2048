import { nanoid } from 'nanoid';
import { FC } from 'react';
import { useMovements } from '../hooks';
import { useState } from '../Providers/machine';
import { Card } from './Card';
import { Spinner } from './Spinner';

const GameBoard: FC = () => {
  const board = useState(
    state => {
      return state.context.game.board;
    },
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
  );

  const columns = useState(state => {
    return state.context.game.boardSide;
  });

  const busy = useState(state => state.matches('started.engine.busy'));

  useMovements();

  return busy ? (
    <Spinner />
  ) : (
    <div
      className=" grid gap-[0.35rem] p-2 sm:gap-3 sm:p-3 xl:gap-3 lg:p-4 relative"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {board.map(val => (
        <Card key={nanoid()} columns={columns}>
          {val}
        </Card>
      ))}
    </div>
  );
};

export default GameBoard;
