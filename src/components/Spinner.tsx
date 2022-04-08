import { FC } from 'react';

export const Spinner: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center relative">
      <div className="w-32 h-32 lg:w-60 lg:h-60 lg:border-t-8 lg:border-b-8 border-t-4 border-b-4 border-yellow-700 rounded-full animate-spin" />
    </div>
  );
};
