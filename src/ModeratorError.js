module.exports = class ModeratorError extends Error {
    /**
     * Module Error Handler
     * @param {String} message Error Message
    */
    constructor(message) {
        if (message instanceof Error == 'Error') {
            super(message.message)
        }
        if (typeof message == 'string') super(message)
        this.name = 'ModeratorError'
    }
}