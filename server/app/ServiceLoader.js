const BookService = require('../book/BookService');

function ServiceLoader(App, Collections, callback) {
    callback({
        BookService: new BookService(App, Collections)
    });
}

module.exports = ServiceLoader;