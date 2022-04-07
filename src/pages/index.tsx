import { useSelector } from '@xstate/react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { FC, useCallback, useContext, useEffect } from 'react';
import { MachineContext } from '../Providers/machine/Provider';

type CardProps = {
  children?: number;
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  columns?: 4 | 5 | 6;
};

const Card: FC<CardProps> = ({
  children,
  color = 'white',
  opacity = 0.35,
  backgroundColor = 'black',
  columns = 4,
}) => {
  const className = {
    4: 'rounded sm:rounded-md lg:rounded-xl xl:rounded-2xl shadow-md md:shadow-2xl text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl',
    5: 'rounded sm:rounded-md lg:rounded-lg xl:rounded-xl shadow-md md:shadow-2xl text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl',
    6: 'rounded sm:rounded-md lg:rounded-lg xl:rounded-xl shadow-md md:shadow-xl text-base sm:text-2xl  xl:text-3xl 2xl:text-4xl',
  };
  return (
    <div
      className={`${className[columns]} aspect-square flex items-center justify-center font-bold`}
      style={{ color, opacity, backgroundColor }}
    >
      {children}
    </div>
  );
};

// const GRID_SIZE = 4;

const Index: FC = () => {
  const service = useContext(MachineContext);
  const board = useSelector(
    service,
    state => {
      return state.context.game.board;
    },
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
  );

  const status = useSelector(service, state => {
    return state.context.game.status;
  });

  const columns = useSelector(service, state => {
    return state.context.game.boardSide;
  });

  const { send } = service;

  const handler = useCallback(
    (e: KeyboardEvent) => {
      console.log(e.key);

      if (e.key === 'ArrowUp') {
        send('GAME.MOVE.UP');
      }
      if (e.key === 'ArrowDown') {
        send('GAME.MOVE.DOWN');
      }
      if (e.key === 'ArrowLeft') {
        send('GAME.MOVE.LEFT');
      }
      if (e.key === 'ArrowRight') {
        send('GAME.MOVE.RIGHT');
      }
    },
    [send],
  );

  useEffect(() => {
    send('START');
  }, [send]);

  useEffect(() => {
    console.log('OK status=>', status);
  });

  useEffect(() => {
    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [board, handler]);
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
        <div
          className="w-full h-full grid gap-[0.35rem] p-2 sm:gap-3 sm:p-3 xl:gap-3 lg:p-4 z-50 relative"
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
      </div>
      {status === 'stopped' && (
        <button
          onClick={() => {
            send('GAME.START');
          }}
          className="my-4 rounded sm:rounded-md lg:rounded-xl xl:rounded-2xl shadow-md md:shadow-2xl text-2xl sm:text-5xl xl:text-7xl border-2 border-slate-800 px-5 py-2 text-slate-700"
        >
          RESTART
        </button>
      )}
    </div>
  );
};

export default Index;
