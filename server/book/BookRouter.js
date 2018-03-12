function BookRouter (App, Services, router) {

    const Target = 'BookRouter';

    function newBook (book, res) {
        Services.BookService.insert(book, Services.DefaultHandler(res))
    }

    router.post('/book', App.ValidateBody(['title', 'author'], newBook));
}

module.exports = BookRouter;