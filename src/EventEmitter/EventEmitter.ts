import {EventListeners, EventListeningController} from './types';

/**
 * Class which allows to emit events
 */
export class EventEmitter {
  /**
   * List of created event listeners
   * @type {{}}
   */
  private listeners: EventListeners = {};

  /**
   * Emits event and calls each bound listener
   * @param {string} eventName
   * @param params
   */
  emit(eventName: string, ...params: any[]) {
    this.listeners[eventName]?.forEach(l => l(...params));
  }

  /**
   * Adds events listener
   * @param {string} eventName
   * @param {EventListener} listener
   */
  on: EventListeningController = (eventName, listener) => {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  };

  /**
   * Removes event listener
   * @param {string} eventName
   * @param {EventListener} listener
   */
  off: EventListeningController = (eventName, listener) => {
    if (eventName in this.listeners) {
      const index = this.listeners[eventName].indexOf(listener);

      if (index === -1) {
        this.listeners[eventName].splice(index, 1);

        // Delete key in case no listeners left
        if (this.listeners[eventName].length === 0) {
          delete this.listeners[eventName];
        }
      }
    }
  };
}
