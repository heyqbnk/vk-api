/**
 * Usual event listener
 */
export type EventListener = (...args: any[]) => any;

/**
 * Describes listener controller which adds or removes listener on event
 */
export type EventListeningController = (
  eventName: string,
  listener: EventListener,
) => void;

/**
 * List of event listeners
 */
export type EventListeners = Record<string, EventListener[]>;
