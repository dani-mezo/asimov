const Status = require('./Status');

class Response {
    constructor(build) {
        this.status = build.status;
        this.message = build.message;
        this.data = build.data;
        this.callback = build.callback;
    }
    static get Builder() {
        class Builder {
            constructor() {
            }

            ok() {
                this.status = Status.Ok;
                return this;
            }

            fail() {
                this.status = Status.Fail;
                return this;
            }

            message(message) {
                this.message = message;
                return this;
            }

            data(data) {
                this.data = data;
                return this;
            }

            call(callback){
                this.callback = callback;
                return this;
            }

            build() {
                let response = new Response(this);
                if(this.callback) this.callback(response);
                return response;
            }
        }
        return Builder;
    }
}

module.exports = Response;