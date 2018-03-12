
const Configuration = require('./Configuration');
const LogService = require('./server/log/Log');
const App = require('./server/app/App');
const Server = require('./server/Server');

// --------------- init Log

const Log = new LogService(Configuration);

// --------------- init Server

const expressApp = new Server(Log, Configuration);

// --------------- init App

new App(Log, Configuration, expressApp);