import { nanoid } from 'nanoid';
import Image from 'next/image';
import { FC } from 'react';

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
      className="rounded sm:rounded-md lg:rounded-xl xl:rounded-2xl shadow-md md:shadow-2xl text-5xl flex items-center justify-center font-bold"
      style={{ color, opacity, backgroundColor }}
    >
      {children}
    </div>
  );
};

const GRID_SIZE = 4;

const Index: FC = () => {
  return (
    <div className="h-screen pt-5 flex flex-col items-center text-7xl text-yellow-900 font-semibold bg-yellow-50">
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
          {Array.from({ length: Math.pow(GRID_SIZE, 2) }).map(() => (
            <Card key={nanoid()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
