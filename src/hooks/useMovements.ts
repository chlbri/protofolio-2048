import { useCallback, useEffect } from 'react';
import { useSend } from '../Providers/machine';

export function useMovements() {
  const send = useSend();

  const handler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          send('GAME.MOVE.UP');
          break;
        case 'ArrowDown':
          send('GAME.MOVE.DOWN');
          break;
        case 'ArrowLeft':
          send('GAME.MOVE.LEFT');
          break;
        case 'ArrowRight':
          send('GAME.MOVE.RIGHT');
          break;

        default:
          break;
      }
    },
    [send],
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
