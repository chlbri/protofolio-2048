import { FC } from 'react';
import { useSend, useState } from '../Providers/machine';

type Props = {
  size?: number;
};

/**
 *
 * @param size 'in rem'
 * @returns
 */
export const Refresh: FC<Props> = ({ size = 1.5 }) => {
  const send = useSend();
  const disabled = useState(state =>
    state.matches('started.engine.gameover'),
  );
  return (
    <button
      className="p-3 border-lg border-[6px] border-yellow-800 max-w-min rounded-full cursor-pointer active:scale-95 shadow-lg active:shadow-inner hover:border-slate-700 disabled:border-gray-600 group disabled:opacity-40"
      onClick={() => {
        send('GAME.RESTART');
      }}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ width: `${size}rem`, height: `${size}rem` }}
        className="stroke-2 hover:stroke-slate-600 group-disabled:stroke-gray-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
};
