const path = require('path');
const express = require('express');
const router = express.Router();

const CollectionManager = require('../database/CollectionManager');
const DatabaseContext = require('../database/DatabaseContext');

const ServiceLoader = require('./ServiceLoader');
const EndpointLoader = require('./EndpointLoader');
const ValidateBody = require('../utility/ValidateBody');
const Database = require('../database/Database');

function App (Log, Configuration, app) {

    // --------------- APP environment

    const ApplicationContext = {
        Log, CollectionManager, DatabaseContext, Configuration, ValidateBody
    };

    // --------------- init Database, Services, Endpoints

    new Database(ApplicationContext)
        .then(Collections =>
            new ServiceLoader(ApplicationContext, Collections, Services =>
                new EndpointLoader(ApplicationContext, Services, router)));

    configureRoutes(app);
}

function configureRoutes(app) {
    app.use('/', router);
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    });
}

module.exports = App;