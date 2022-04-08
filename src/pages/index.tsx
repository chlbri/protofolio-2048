import { FC, useEffect } from 'react';
import { BoardSideSlider } from '../components/BoardSideSlider';
import GameBackGround from '../components/GameBackGround';
import GameBoard from '../components/GameBoard';
import { Refresh } from '../components/Refresh';
import { Rinit } from '../components/Rinit';
import { Score } from '../components/Score';
import { useSend } from '../Providers/machine';

// const GRID_SIZE = 4;

// type StepProps = {
//   children: number;
// };

// const Step: FC<StepProps> = ({ children }) => {
//   return <div className="text-2xl"></div>;
// };

function useStart() {
  const send = useSend();

  useEffect(() => {
    send('START');
  }, [send]);
}

const Index: FC = () => {
  useStart();

  return (
    <div className="h-[100%] pt-5 flex flex-col items-center text-7xl text-yellow-900 font-semibold space-y-4">
      <span>2048 !</span>
      <div className="w-full h-full flex flex-col lg:flex-row">
        <BoardSideSlider />
        <GameBackGround>
          <GameBoard />
        </GameBackGround>
        <div
          className="flex-1 flex flex-col space-y-10 
        items-center mt-10"
        >
          <Score />
          <Refresh size={5} />
        </div>
      </div>

      <Rinit />
    </div>
  );
};

export default Index;
