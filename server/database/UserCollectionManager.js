const Response = require('./Response');
const Status = require('./Status');

function UserCollectionManager(CollectionManagerInstance) {

    function authenticate (idField, passwordField) {
        return function (id, password, callback) {
            CollectionManagerInstance.get(idField)(id, errorHandler(callback, response => {

                const entity = response.data;

                if(Crypto.verify(password, entity[passwordField])) {
                    new Response.Builder().ok().message(Messages.Success.Authentication).call(callback).build();
                    return;
                }

                new Response.Builder().fail().message(Messages.Error.Authentication).call(callback).build();
            }));
        }
    }

    function authorize (tokenField) {
        return function (token, callback) {
            CollectionManagerInstance.get(tokenField)(token, errorHandler(callback, response => {

                const entity = response.data;

                if(entity[tokenField] === token) {
                    new Response.Builder().ok().message(Messages.Success.Authorization).call(callback).build();
                    return;
                }

                new Response.Builder().fail().message(Messages.Error.Authorization).call(callback).build();
            }));
        }
    }

    function errorHandler(callback, processor) {
        return function (response) {
            if(response.status !== Status.Ok) {
                callback(response);
                return;
            }
            processor(response);
        }
    }

    CollectionManagerInstance.authenticate = authenticate;
    CollectionManagerInstance.authorize = authorize;

    return CollectionManagerInstance;
}

module.exports = UserCollectionManager;

