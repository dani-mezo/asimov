const ascii = require('ascii-art')

var LogService = function(Configuration){

    var renderedLogo = false;
    var buffer = [];

    const APP_NAME = Configuration.app;

    initializeApp();

    const target = 'Log';
    init(target);
    initErrorHandling();

    function err(msg, target){
        console.error('ERROR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ------------------------> ' + target + ': ' + msg);
    }

    function info(msg, target){
        console.info('INFO - ' + target + ': ' + msg);
    }

    function warn(msg, target){
        console.warn('WARN ------------------> ' + target + ': ' + msg);
    }

    function error(msg, target){
        err(msg, target);
    }

    function init(target){
        if(renderedLogo) console.info('INIT .......... Intializing ... ' + target);
        else buffer.push(target);
    }

    function initializeApp(){
        ascii.font(APP_NAME, 'Doom', rendered => {
            console.log('Welcome to');
            console.log(rendered);
            renderedLogo = true;
            buffer.forEach(init);
        });
    }

    function exit(){
        console.log('EXIT - Shutting down server.......');
        console.log('BYE.');
    }

    function initErrorHandling(){
        process.on('uncaughtException', (err) => {
            error(err, 'Caught exception');
            console.error(err.stack);
        });
    }

    function exitWithError(errorMessage, target, err) {
        error(errorMessage, target);
        if(err) console.log(err);
        exit();
        process.exit();
    }

    return {
        err: err,
        info: info,
        warn: warn,
        error: error,
        init: init,
        exit: exit,
        exitWithError: exitWithError
    }
}

module.exports = LogService;