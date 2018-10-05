  "use strict";
  class Event {
      constructor(o) {
          this.type = o.type;
          this.data = o.data;
          this.target = o.target;
          this.currentTarget = o.target;
          this.delegateTarget = o.target;
          this.timeStamp = new Date().getTime();
          this.isDefaultPrevented = false;
          this.isImmediatePropagationStopped = false;
          this.isPropagationStopped = false;
      }
      preventDefault() {
          this.isDefaultPrevented = true;
      }
      stopPropagatio() {
          this.isPropagationStopped = true;
      }
      stopImmediatePropagation() {
          this.isImmediatePropagationStopped = true;
          this.stopPropagation();
      }
  }

  // =====================================================================================
  function getEventItem(context, handler, option) {
      context += "";
      if (!context) {
          return null;
      }
      option = option || {};
      let arr = context.split(".");
      let type = arr.shift();
      let namespace = "";
      if (arr.length) {
          namespace = arr.join(".");
      }
      let eventItem = {
          context: context,
          type: type,
          namespace: namespace,
          handler: handler,
          one: option.one,
          prepend: option.prepend,
          defaultEvent: option.defaultEvent
      };
      return eventItem;
  }

  function getEventList(types, handler, option) {
      if (!types) {
          return [];
      }

      if (handler && typeof(handler) === "object") {
          option = handler;
      }
      let list = [];

      if (typeof(types) === "object") {
          let keys = Object.keys(types);
          keys.forEach(function(type) {
              let eventItem = getEventItem(type, types[type], option);
              if (eventItem) {
                  list.push(eventItem);
              }
          });
          return list;
      }

      if (typeof(types) === "string") {
          let arr = types.split(" ");
          arr.forEach(function(type) {
              let eventItem = getEventItem(type, handler, option);
              if (eventItem) {
                  list.push(eventItem);
              }
          });
      }
      return list;
  }

  // =====================================================================================
  function addEvent(eventListener, event, maxListeners) {
      if (event.defaultEvent) {
          eventListener.defaultEvent = event;
          return;
      }
      if (eventListener.events.length >= maxListeners) {
          let msg = "Possible Event memory leak detected. ";
          msg += "More than " + maxListeners + " (max limit) listeners added. ";
          msg += "Use setMaxListeners(n) to increase limit.";
          console.warn(msg);
          return;
      }
      if (event.prepend) {
          eventListener.events.unshift(event);
      } else {
          eventListener.events.push(event);
      }
  }

  function addEvents(eventListeners, eventList, maxListeners) {
      eventList.forEach(function(event) {
          let type = event.type;
          if (typeof(eventListeners[type]) === "undefined") {
              eventListeners[type] = {
                  events: [],
                  defaultEvent: null
              };
          }
          let handler = event.handler;
          if (typeof(handler) !== "function") {
              return;
          }
          let eventListener = eventListeners[type];
          addEvent(eventListener, event, maxListeners);
      });
  }

  // =====================================================================================

  function removeEventByDefault(eventListeners, type) {
      let eventListener = eventListeners[type];
      if (!eventListener) {
          return;
      }
      if (eventListener.defaultEvent) {
          eventListener.defaultEvent = null;
      }
  }

  function removeEventByNamespace(eventListeners, namespace) {
      let types = Object.keys(eventListeners);
      types.forEach(function(type) {
          let eventListener = eventListeners[type];
          let events = eventListener.events;
          for (let i = 0; i < events.length; i++) {
              let item = events[i];
              if (item && item.namespace === namespace) {
                  events.splice(i, 1);
                  i--;
              }
          }
      });
  }

  function removeEventByHandler(eventListeners, type, handler) {
      let eventListener = eventListeners[type];
      if (!eventListener) {
          return;
      }
      let events = eventListener.events;
      for (let i = 0; i < events.length; i++) {
          let item = events[i];
          if (item && item.handler === handler) {
              events.splice(i, 1);
              i--;
          }
      }
  }

  function removeEventByType(eventListeners, type) {
      let eventListener = eventListeners[type];
      if (!eventListener) {
          return;
      }
      if (eventListener.defaultEvent) {
          eventListener.events = [];
      } else {
          delete eventListeners[type];
      }
  }

  function removeEvent(eventListeners, event) {
      let type = event.type;
      if (event.defaultEvent) {
          removeEventByDefault(eventListeners, type);
          return;
      }
      let namespace = event.namespace;
      if (!type && namespace) {
          removeEventByNamespace(eventListeners, namespace);
          return;
      }
      let handler = event.handler;
      if (typeof(handler) === "function") {
          removeEventByHandler(eventListeners, type, handler);
          return;
      }
      removeEventByType(eventListeners, type);
  }

  function removeEvents(eventListeners, eventList) {
      eventList.forEach(function(event) {
          removeEvent(eventListeners, event);
      });
  }

  function removeAllEvents(eventListeners) {
      let types = Object.keys(eventListeners);
      types.forEach(function(type) {
          removeEventByType(eventListeners, type);
      });
  }

  // =====================================================================================
  function sendEventList(eventListener, event, target, data) {
      let events = eventListener.events;
      for (let i = 0; i < events.length; i++) {
          let item = events[i];
          event.handleObj = item;
          event.namespace = item.namespace;
          item.handler.call(target, event, data);
          if (item.one) {
              events.splice(i, 1);
              i--;
          }
          if (event.isPropagationStopped) {
              break;
          }
      }
  }

  function sendEventDefault(eventListener, event, target, data) {
      let defaultEvent = eventListener.defaultEvent;
      if (!defaultEvent || event.isDefaultPrevented) {
          return;
      }
      defaultEvent.handler.call(target, event, data);
  }

  function sendEvent(eventListeners, type, data, target) {
      let eventListener = eventListeners[type];
      if (!eventListener) {
          return;
      }
      let event = new Event({
          type: type,
          target: target,
          data: data
      });
      sendEventList(eventListener, event, target, data);
      sendEventDefault(eventListener, event, target, data);
  }

  // =====================================================================================
  class EventBase {
      constructor() {
          this.maxListeners = 10;
      }

      setMaxListeners(n) {
          this.maxListeners = Number(n) || 10;
      }

      getMaxListeners() {
          return this.maxListeners;
      }

      getEventListeners() {
          if (!this.eventListeners) {
              this.eventListeners = {};
          }
          return this.eventListeners;
      }

      // =======================================================

      bind(types, handler, option) {
          let eventList = getEventList(types, handler, option);
          if (!eventList.length) {
              return this;
          }
          let eventListeners = this.getEventListeners();
          addEvents(eventListeners, eventList, this.maxListeners);
          return this;
      }

      on() {
          return this.bind.apply(this, arguments);
      }

      // =======================================================

      one(types, handler) {
          this.bind(types, handler, {
              one: true
          });
          return this;
      }

      once() {
              return this.one.apply(this, arguments);
          }
          // =======================================================

      unbind(types, handler, option) {
          let eventListeners = this.getEventListeners();
          if (!arguments.length) {
              removeAllEvents(eventListeners);
              return this;
          }
          let eventList = getEventList(types, handler, option);
          if (!eventList.length) {
              return this;
          }
          removeEvents(eventListeners, eventList);
          return this;
      }

      off() {
          return this.unbind.apply(this, arguments);
      }

      // =======================================================

      trigger(type, data) {
          let eventListeners = this.getEventListeners();
          sendEvent(eventListeners, type, data, this);
          return this;
      }

      emit() {
          return this.trigger.apply(this, arguments);
      }

      // =======================================================

      toString() {
          return "[object EventBase]";
      }
  }

  module.exports = EventBase;