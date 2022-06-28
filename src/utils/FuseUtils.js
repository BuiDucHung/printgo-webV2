import { INAPP_NOTIFICATION_EMITTER} from 'const';

class EventEmitter {

    constructor() {
        this.events = {};
    }

    _getEventListByName(eventName) {
        if (typeof this.events[eventName] === 'undefined') {
            this.events[eventName] = new Set();
        }
        return this.events[eventName]
    }

    on(eventName, fn) {
        this._getEventListByName(eventName).add(fn);
    }

    once(eventName, fn) {
        const self = this;
        const onceFn = function (...args) {
            self.removeListener(eventName, onceFn);
            fn.apply(self, args);
        };
        this.on(eventName, onceFn);
    }

    emit(eventName, ...args) {
        this._getEventListByName(eventName).forEach(function (fn) {
            fn.apply(this, args);
        }.bind(this));
    }

    addEventListener (eventName, fn) {
        this.on(eventName, fn)
    }

    removeListener(eventName, fn) {
        this._getEventListByName(eventName).delete(fn);
    }
}

class AppEvent extends EventEmitter {
    normalSuccess(content, title = null) {
        this.emit(INAPP_NOTIFICATION_EMITTER, {type: 'success', content, title});
    }
    normalInfo(content, title = null) {
        this.emit(INAPP_NOTIFICATION_EMITTER, {type: 'info', content, title});
    }
    normalError(content, title = null) {
        this.emit(INAPP_NOTIFICATION_EMITTER, {type: 'error', content, title});
    }
}

export const InAppEvent = new AppEvent();
