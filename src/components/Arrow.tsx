import { NExtract } from '@bemedev/types';
import { FC, SVGProps } from 'react';
import { Event } from 'xstate';
import { TEvent, useSend } from '../Providers/machine';

type ArrowProps = {
  children: SVGProps<SVGPathElement>;
  size?: number;
  strokeWidth?: number;
  move: NExtract<
    Event<TEvent>,
    | 'GAME.MOVE.UP'
    | 'GAME.MOVE.DOWN'
    | 'GAME.MOVE.LEFT'
    | 'GAME.MOVE.RIGHT'
  >;
};

/**
 *
 * @param props : size in "rem"
 * @returns
 */
export const Arrow: FC<ArrowProps> = ({
  children,
  size = 3,
  strokeWidth = 2,
  move,
}) => {
  const send = useSend();
  return (
    <div
      className="active:scale-90 active:shadow-inner transition-transform duration-100 ease-in-out shadow-lg rounded-full p-1"
      onClick={() => {
        send(move);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      >
        {children}
      </svg>
    </div>
  );
};
