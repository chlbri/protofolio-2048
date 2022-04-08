import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { Subscribable } from 'xstate';
import { MachineContext } from '../Provider';
import { Interpreter } from '../types';

export function useSend() {
  const service = useContext(MachineContext);
  return service.send;
}

export function useState<
  T,
  TEmitted = Interpreter extends Subscribable<infer Emitted>
    ? Emitted
    : never,
>(
  selector: (emitted: TEmitted) => T,
  compare?: (a: T, b: T) => boolean,
  getSnapshot?: (a: Interpreter) => TEmitted,
): T {
  const service = useContext(MachineContext);
  return useSelector(service, selector, compare, getSnapshot);
}
