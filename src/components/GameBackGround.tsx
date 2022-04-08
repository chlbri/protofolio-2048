import Image from 'next/image';
import { FC, ReactNode } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Arrow } from './Arrow';

type Props = {
  children: ReactNode;
};

type ContainerProps = {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <div className="z-50 flex">
      <div className="flex w-14 justify-center items-center">
        <Arrow move="GAME.MOVE.LEFT">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </Arrow>
      </div>
      <div className="flex-grow space-y-4 flex h-full flex-col justify-between text-blue items-center">
        <Arrow move="GAME.MOVE.UP">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
          />
        </Arrow>
        <div className="relative w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-5/12 m-auto aspect-square rounded-xl overflow-hidden z-50">
          {children}
        </div>
        <Arrow move="GAME.MOVE.DOWN">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
          />
        </Arrow>
      </div>
      <div className="flex w-14 justify-center items-center">
        <Arrow move="GAME.MOVE.RIGHT">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Arrow>
      </div>
    </div>
  ) : (
    <div className="relative w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-5/12 m-auto aspect-square rounded-xl overflow-hidden z-50">
      {children}
    </div>
  );
};

const GameBackGround: FC<Props> = ({ children }) => {
  return (
    <Container>
      <div className="absolute inset-0 ">
        <Image
          layout="fill"
          objectFit="cover"
          alt="backGround"
          src="/images/wood-small.jpg"
        />
      </div>
      {children}
    </Container>
  );
};

export default GameBackGround;
