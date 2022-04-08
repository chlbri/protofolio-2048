import { FC } from 'react';

type CardProps = {
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  columns?: 4 | 5 | 6;
};

export const Card: FC<CardProps> = ({
  children,
  color = 'white',
  opacity = 0.4,
  backgroundColor = 'black',
  columns = 4,
}) => {
  return (
    <div
      className="black rounded sm:rounded-md lg:rounded-xl xl:rounded-2xl shadow-md md:shadow-2xl text-2xl xs:text-3xl sm:text-4xl lg:text-5xl   2xl:text-6xl aspect-square flex items-center justify-center font-bold"
      style={{ color, opacity, backgroundColor }}
    >
      <div style={{ transform: `scale(${4 / columns})` }}>{children}</div>
    </div>
  );
};
