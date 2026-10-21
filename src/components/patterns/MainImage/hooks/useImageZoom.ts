import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { calculateLensPosition } from '../MainImage.utils';

type Position = { x: number; y: number };

const ORIGIN: Position = { x: 0, y: 0 };

const subscribeTouchMove = (element: HTMLElement | null, listener: (event: TouchEvent) => void) => {
  if (!element) return undefined;
  element.addEventListener('touchmove', listener, { passive: false });
  return () => element.removeEventListener('touchmove', listener);
};

export const useImageZoom = (isMobile: boolean) => {
  const [isZooming, setIsZooming] = useState(false);
  const [lensPosition, setLensPosition] = useState<Position>(ORIGIN);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const cancelFrame = useCallback(() => {
    if (frameRef.current === null) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  const getPosition = useCallback((clientX: number, clientY: number) => {
    const rect = imageRef.current?.getBoundingClientRect();
    return rect ? calculateLensPosition(clientX, clientY, rect) : null;
  }, []);

  const showLens = useCallback((position: Position | null) => {
    if (!position) return;
    setLensPosition(position);
    setIsZooming(true);
  }, []);

  const onMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!isMobile) showLens(getPosition(event.clientX, event.clientY));
  };

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];
    showLens(getPosition(clientX, clientY));
  };

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const { clientX, clientY } = event.touches[0];
      const position = getPosition(clientX, clientY);
      cancelFrame();
      frameRef.current = requestAnimationFrame(() => showLens(position));
    },
    [cancelFrame, getPosition, showLens]
  );

  const stopZoom = () => {
    setIsZooming(false);
    cancelFrame();
  };

  useEffect(() => {
    const unsubscribe = subscribeTouchMove(imageRef.current, onTouchMove);
    return () => {
      unsubscribe?.();
      cancelFrame();
    };
  }, [onTouchMove, cancelFrame]);

  return { imageRef, isZooming, lensPosition, onMouseMove, onTouchStart, onMouseLeave: stopZoom, onTouchEnd: stopZoom };
};
