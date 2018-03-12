const Messages = require('./Messages');
const Response = require('./Response');

/**
 * CollectionManager is a template mechanism for MongoDb collection management. It is expected that every resource
 * has a corresponding instance, where the CRUD operations are prepared by this template.
 *
 * Usage:
 *      // There exists a book resource, with a MongoDb collection named 'bookCollection'
 *      const bookContext = new DatabaseContext.Builder().collection(bookCollection).target('BookService').build();
 *      const bookCollectionManager = new CollectionManager(Log, bookContext);
 *      const books = {
 *          insert: bookCollectionManager.insert(),
 *          getAll: bookCollectionManager.getAll(),
 *          getOneById: bookCollectionManager.getOne('id'),
 *          getOneByName: bookCollectionManager.getOne('name'),
 *          getAllByType: bookCollectionManager.getAllBy('type'),
 *          getAllByAuthor: bookCollectionManager.getAllBy('author'),
 *          getAllByDate: bookCollectionManager.getAllBy('date'),
 *          update: bookCollectionManager.update(),
 *          deleteOneByName: bookCollectionManager.deleteOne('name'),
 *          deleteOneById: bookCollectionManager.deleteOne('id'),
 *          deleteByType: bookCollectionManager.deleteAllBy('type'),
 *          deleteAll: bookCollectionManager.deleteAll()
 *      }
 *
 *      // practical usage:
 *      books.deleteOneByName('jeff');
 *      books.getAllByType('drama', response => {
 *          console.log(response);
 *      });
 */
function CollectionManager(Log, DatabaseContext) {

    const Collection = DatabaseContext.collection;

    function insert () {
        return (object, callback) => {
            Collection.insert(object, errorHandler(callback, () =>
                new Response.Builder().ok().data(object).message(Messages.Success.Insert).call(callback).build()));
        }
    }

    function getAll () {
        return callback => {
            Collection.find({}).toArray(errorHandler(callback, documents =>
                new Response.Builder().ok().data(documents).message(Messages.Success.GetAll).call(callback).build()));
        };
    }

    function getOne (identifier) {
        return (id, callback) => {
            const query = {
                [identifier]: id
            };

            Collection.find(query).toArray(errorHandler(callback, documents => {
                if(documents[0]) {
                    new Response.Builder().ok().data(documents[0]).message(Messages.Success.Get).call(callback).build();
                    return;
                }

                new Response.Builder().fail().message(Messages.Error.NoDocument).call(callback).build();
            }));
        }
    }

    function getAllBy (identifier) {
        return (id, callback) => {
            const query = {
                [identifier]: id
            };
            Collection.find(query).toArray(errorHandler(callback, documents =>
                new Response.Builder().ok().data(documents).message(Messages.Success.GetAll).call(callback).build()));
        }
    }

    const deleteAll = () => () => Collection.remove();

    function deleteOne (identifier) {
        return id => {
            const query = {
                [identifier]: id
            };
            Collection.remove(query, {justone: true});
        }
    }

    function deleteAllBy(field) {
        return input => {
            const query = {
                [field]: input
            };
            Collection.remove(query);
        }
    }

    function update(){}

    function errorHandler(callback, processor) {
        return (err, documents) => {
            if(err) {
                Log.error(Messages.Error.Database, DatabaseContext.target);
                new Response.Builder().fail().message(Messages.Error.Database).call(callback).build();
                throw err;
            }
            processor(documents);
        }
    }

    return {
        insert, getAllBy, getOne, getAll, deleteAll, deleteOne, deleteAllBy, update
    };
}

module.exports = CollectionManager;