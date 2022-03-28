import { useInterpret } from '@xstate/react';
import { createContext, FC } from 'react';
import { InterpreterFrom } from 'xstate';
import { machine } from '../ebr/machine';

export const MachineContext = createContext(
  {} as InterpreterFrom<typeof machine>,
);

const MachineProvider: FC = ({ children }) => {
  const value = useInterpret(machine);
  return (
    <MachineContext.Provider {...{ value }}>
      {children}
    </MachineContext.Provider>
  );
};

export default MachineProvider;
