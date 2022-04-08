import { boardSideSchema } from 'game_engine';
import { FC, useEffect } from 'react';
import { useSend, useState } from '../Providers/machine';

export const BoardSideSlider: FC = () => {
  const send = useSend();

  useEffect(() => {
    send('START');
  }, [send]);

  const defaultBoarderSide = useState(
    state => state.context.game.boardSide,
    () => true,
  );

  const disabled = useState(state =>
    state.matches('started.engine.gameover'),
  );

  return (
    <div className="flex-1 mb-4 lg:mb-0 items-center flex justify-center">
      <div
        className="lg:h-80 w-80 lg:w-auto space-y-3 lg:space-y-0 flex flex-col lg:flex-row-reverse items-center justify-center relative scale-75 lg:scale-100"
        // style={{}}
      >
        <div className="flex flex-row-reverse lg:flex-col justify-between text-2xl w-full lg:w-auto lg:h-full lg:-ml-14">
          <div>°36</div>
          <div>°25</div>
          <div>°16</div>
        </div>
        <input
          disabled={disabled}
          type="range"
          name=""
          id=""
          className="lg:-rotate-90 bg-slate-800 w-40 scale-[2] text-blue fill-slate-500 stroke-slate-700 accent-yellow-800"
          min={4}
          max={6}
          defaultValue={defaultBoarderSide}
          onChange={e => {
            send({
              type: 'GAME.CHANGE_BOARDSIDE',
              boardSide: boardSideSchema.parse(
                Number.parseInt(e.target.value),
              ),
            });
          }}
        />
      </div>
    </div>
  );
};
