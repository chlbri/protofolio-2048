import { useInterpret } from '@xstate/react';
import { createContext, FC } from 'react';
import { InterpreterFrom } from 'xstate';
import { mainMachine } from './machine';

export const MachineContext = createContext(
  {} as InterpreterFrom<typeof mainMachine>,
);

type Props = {};

const Provider: FC<Props> = ({ children }) => {
  const value = useInterpret(mainMachine);
  return (
    <MachineContext.Provider {...{ value }}>
      {children}
    </MachineContext.Provider>
  );
};

export default Provider;
