import { useInterpret } from '@xstate/react';
import { machine, S_Machine } from 'kernel/lib/machine/machine';
import { createContext, FC } from 'react';
import { InterpreterFrom } from 'xstate';

export const MachineContext = createContext(
  {} as InterpreterFrom<typeof machine>,
);

const MachineProvider: FC = ({ children }) => {
  const value = useInterpret(machine as S_Machine);
  return (
    <MachineContext.Provider {...{ value }}>
      {children}
    </MachineContext.Provider>
  );
};

export default MachineProvider;
