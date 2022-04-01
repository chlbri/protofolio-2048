import { useSelector } from '@xstate/react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { FC, useCallback, useContext, useEffect } from 'react';
import { MachineContext } from '../Providers/machine';

type CardProps = {
  children?: number;
  color?: string;
  backgroundColor?: string;
  opacity?: number;
};

const Card: FC<CardProps> = ({
  children,
  color = 'white',
  opacity = 0.35,
  backgroundColor = 'black',
}) => {
  return (
    <div
      className="rounded sm:rounded-md lg:rounded-xl xl:rounded-2xl shadow-md md:shadow-2xl text-2xl sm:text-5xl xl:text-7xl aspect-square flex items-center justify-center font-bold"
      style={{ color, opacity, backgroundColor }}
    >
      {children}
    </div>
  );
};

// const GRID_SIZE = 4;

const Index: FC = () => {
  const service = useContext(MachineContext);
  const cards = useSelector(
    service,
    state => {
      return state.context.back.game.cards;
    },
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
  );

  const status = useSelector(
    service,
    state => state.context.back.game.possibleMoves,
  );

  const { send } = service;

  const handler = useCallback(
    (e: KeyboardEvent) => {
      console.log(e.key);

      if (e.key === 'ArrowUp') {
        send('MOVE_UP');
      }
      if (e.key === 'ArrowDown') {
        send('MOVE_DOWN');
      }
      if (e.key === 'ArrowLeft') {
        send('MOVE_LEFT');
      }
      if (e.key === 'ArrowRight') {
        send('MOVE_RIGHT');
      }
    },
    [send],
  );

  useEffect(() => {
    send('START');
  }, [send]);

  useEffect(() => {
    console.log(status);
  });

  useEffect(() => {
    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [cards, handler]);
  return (
    <div className="h-[100%] pt-5 flex flex-col items-center text-7xl text-yellow-900 font-semibold">
      <span>2048 !</span>
      <div className="relative w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-5/12 m-auto aspect-square rounded-xl overflow-hidden">
        <div className="absolute inset-0 ">
          <Image
            layout="fill"
            objectFit="cover"
            alt="backGround"
            src="/images/wood-small.jpg"
          />
        </div>
        <div className="w-full h-full grid grid-cols-4 gap-2 p-2 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4 z-50 relative">
          {cards.map(val => (
            <Card key={nanoid()}>{val}</Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
