function Database(App) {

    const Target = "Database";

    App.Log.init(Target);

    var Collections = {};

    function connect (resolve, reject) {
        const defaultHost = 'localhost';
        const defaultPort = 27017;
        const ConnectionString = connectionStringFrom(App.Configuration);
        const MongoClient = require('mongodb').MongoClient;

        App.Log.info("Trying to connect to MongoDb on URL: " + ConnectionString, Target);

        MongoClient.connect(ConnectionString, (err, client) => {
            if (err) {
                reject(err);
                App.Log.exitWithError("Failed to connect to MongoDB on URL: " + ConnectionString, Target, err);
                throw err;
            }

            let db = client.db(App.Configuration.database.database);

            initServices(db);

            App.Log.info("Successfully connected to MongoDb on URL: " + ConnectionString, Target);

            resolve(Collections);
        });
    }

    function initServices(db){
        Collections.books = collection(db, 'books');
    }

    function collection(db, collectionName) {
        if(!db.collection(collectionName)) {
            db.createCollection(collectionName);
        }

        return db.collection(collectionName);
    }

    function connectionStringFrom(Configuration) {

        let host = Configuration.database.host;
        if(!host) {
            App.Log.warn('No host was defined for database connection, going with default: ' + defaultHost, Target);
            host = defaultHost;
        }

        let port = Configuration.database.port;
        if(!port) {
            App.Log.warn('No port was defined for database connection, going with default MongoDb port ' + defaultPort, Target);
            port = defaultPort;
        }

        let database = Configuration.database.database;
        if(!database) {
            App.Log.exitWithError('No database was defined to be selected in MongoDb', Target);
        }

        return 'mongodb://' + host + ':' + port;
    }

    return new Promise(connect);
}

module.exports = Database;
