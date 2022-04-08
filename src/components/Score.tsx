import { FC } from 'react';
import { useState } from '../Providers/machine';

type Props = {
  children?: never;
};

export const Score: FC<Props> = () => {
  const score = useState(state => state.context.game.score);

  return (
    <div className="min-w-[150px] w-52  flex flex-col space-y-4 border h-max px-5 py-2 rounded-lg items-center justify-center text-yellow-800">
      <span className="font-longFamily text-2xl"> ScOre:</span>
      <span className="font-longFamily text-7xl truncate">{score}</span>
    </div>
  );
};
