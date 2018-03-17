import { EventHandler, SyntheticEvent, KeyboardEvent } from 'react';

export const keyCodes = {
  enter: 13,
  space: 32,
};

export const wasKey = (e: KeyboardEvent<any>, ...codes: number[]): boolean =>
  codes.includes(e.keyCode);

type EventFunc<T> = (e: T) => any;
type ReactEvent = EventFunc<SyntheticEvent<any>>;
type HandlerFunc = EventHandler<KeyboardEvent<any>>;

/**
 * Listens for Spacebar or Enter key up events. This is useful when adding
 * click events to non-interactive elements. Important for accessibility.
 */
export const onFocusKeyUp = (cb: ReactEvent): HandlerFunc => {
  return (e: KeyboardEvent<any>) => {
    if (wasKey(e, keyCodes.enter, keyCodes.space)) cb(e);
  };
};
