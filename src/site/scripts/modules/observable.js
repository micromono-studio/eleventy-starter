export default class {
    constructor(defaultValue = {}) {
        this.value = defaultValue
    }

    get() {
        return this.value
    }

    set(value) {
        this.value = value
        this.emit('change', this.value)
    }

    subscribe(callback) {
        return this.on('change', callback)
    }

    unsubscibe(callback) {
        return this.off('change', callback)
    }
}