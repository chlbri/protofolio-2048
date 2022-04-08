import { useEffect, useState as useS } from 'react';
import { useState } from '../Providers/machine';

export function useIsMobile() {
  const [widthIsSmall, setWidthIsSmall] = useS(false);
  const isMobile = useState(state => state.context.isMobile);
  useEffect(() => {
    if (isMobile) {
      setWidthIsSmall(window.innerWidth < 650);
    }
  });
  return widthIsSmall;
}
