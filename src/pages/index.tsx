import { nanoid } from 'nanoid';
import Image from 'next/image';
import { FC } from 'react';

type CardProps = {
  children?: number;
};

const Card: FC<CardProps> = ({ children }) => {
  const backgroundColor = children ? 'maroon' : 'black';
  const opacity = children ? 0.8 : 0.35;
  return (
    <div
      className="rounded-2xl shadow-2xl text-5xl flex text-gray-50 items-center justify-center font-bold"
      style={{ backgroundColor, opacity }}
    >
      {children}
    </div>
  );
};

const Index: FC = () => {
  return (
    <div className="h-screen pt-5 flex flex-col items-center text-7xl text-yellow-900 font-semibold bg-yellow-50">
      <span>2048 !</span>
      <div className="relative w-5/12 m-auto aspect-square bg-yellow-900/20 rounded-xl overflow-hidden">
        <div className="absolute inset-0 ">
          <Image
            layout="fill"
            objectFit="cover"
            alt="backGround"
            src="/images/wood-small.jpg"
          />
        </div>
        <div className="w-full h-full grid grid-cols-4 gap-4 p-4 z-50 backdrop-blur-[2px]">
          {Array.from({ length: 16 }).map(() => (
            <Card key={nanoid()}>{undefined}</Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
