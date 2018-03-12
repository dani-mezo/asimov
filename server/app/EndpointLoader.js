const BookRouter = require('../book/BookRouter');

function EndpointLoader(App, Services, router) {

    Services.DefaultHandler = res => businessResponse => res.send(businessResponse);

    new BookRouter(App, Services, router);
}

module.exports = EndpointLoader;
