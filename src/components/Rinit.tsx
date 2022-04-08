import { FC } from 'react';
import { useSend, useState } from '../Providers/machine';

export const Rinit: FC = () => {
  const isGameOver = useState(state => {
    return state.matches('started.engine.gameover');
  });

  const send = useSend();
  return isGameOver ? (
    <button
      onClick={() => {
        send('GAME.START');
      }}
      className="rounded sm:rounded-md lg:rounded-xl xl:rounded-2xl shadow-md md:shadow-2xl text-2xl sm:text-3xl 2xl:text-5xl border-stone-500 px-5 py-1 text-yellow-600 active:scale-95 transition-transform duration-150 ease-out active:shadow-inner"
    >
      Réinitialiser la carte
    </button>
  ) : null;
};
