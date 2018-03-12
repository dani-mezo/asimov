function BookService(App, Collections) {

    const Target = 'BookService';

    App.Log.init(Target);

    const bookContext = new App.DatabaseContext.Builder().collection(Collections.books).target(Target).build();
    const bookCollectionManager = new App.CollectionManager(App.Log, bookContext);
    const books = {
        insert: bookCollectionManager.insert(),
        getAll: bookCollectionManager.getAll(),
        getOneById: bookCollectionManager.getOne('id'),
        getOneByName: bookCollectionManager.getOne('name'),
        getAllByType: bookCollectionManager.getAllBy('type'),
        getAllByAuthor: bookCollectionManager.getAllBy('author'),
        getAllByDate: bookCollectionManager.getAllBy('date'),
        update: bookCollectionManager.update(),
        deleteOneByName: bookCollectionManager.deleteOne('name'),
        deleteOneById: bookCollectionManager.deleteOne('id'),
        deleteByType: bookCollectionManager.deleteAllBy('type'),
        deleteAll: bookCollectionManager.deleteAll()
    };

    books.insert({author: 'mezo', title: 'coffee', name: 'daniel', type: 'scifi', date: '20180111'});
    books.insert({author: 'hey', title: 'heyaa', name: 'hoy', type: 'scifi', date: '20131101'});
    books.insert({author: 'jeff', title: 'I am jeff', name: 'mrjeff', type: 'drama', date: '20110726'});

    setTimeout(books.deleteAll, 500);

    return books;
}

module.exports = BookService;