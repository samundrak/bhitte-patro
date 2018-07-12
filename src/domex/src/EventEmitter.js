class EventEmitter {
  constructor() {
    this.listeners = new Map([['regular', new Map()]]);
  }

  /**
   * Register new events with listeners
   * @param eventName
   * @param callback
   * @return {EventEmitter}
   */
  on(eventName, callback) {
    return this.addListener('regular', eventName, callback);
  }

  addListener(eventType, eventName, callback) {
    const event = this.listeners.get(eventType);
    if (!event.get(eventName)) {
      event.set(eventName, []);
    }
    event.get(eventName).push(callback);
    return this;
  }

  /**
   * Emit event with data
   * @param eventType
   * @param data
   */
  emit(eventType, data = {}) {
    const regular = this.listeners.get('regular');
    if (!regular) return;
    (regular.get(eventType) || []).forEach(listener => {
      listener({ ...data, eventType });
    });
  }
}

export default EventEmitter;
