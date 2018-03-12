const bodyParser = require('body-parser');
const express = require('express');

function Server(Log, Configuration) {

    Log.init('Server');

    const app = expressApp();

    serverForConfiguration(Log, Configuration, app);

    return app;
}

function expressApp() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));

    return app;
}

function serverForConfiguration(Log, Configuration, app) {

    const host = process.env.OPENSHIFT_NODEJS_IP || Configuration.host;
    const port = process.env.OPENSHIFT_NODEJS_PORT || Configuration.port;

    serverForApp(Log, app, host, port);
}

function serverForApp(Log, app, host, port) {
    const server = require('http').Server(app);

    server.listen(port, host, () => {
        Log.init("Listening on " + host + ':' + port, 'Server');
    });
}

module.exports = Server;