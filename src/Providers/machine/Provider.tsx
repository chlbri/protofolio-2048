import { useInterpret } from '@xstate/react';
import { createContext, FC } from 'react';
import { InterpreterFrom } from 'xstate';
import { machine } from './machine';

export const MachineContext = createContext(
  {} as InterpreterFrom<typeof machine>,
);

type Props = {};

const Provider: FC<Props> = ({ children }) => {
  const value = useInterpret(machine);
  return (
    <MachineContext.Provider {...{ value }}>
      {children}
    </MachineContext.Provider>
  );
};

export default Provider;
