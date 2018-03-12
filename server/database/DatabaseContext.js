class DatabaseContext {
    constructor(build) {
        this.collection = build.collection;
        this.target = build.target;
    }
    static get Builder() {
        class Builder {
            constructor() {
            }

            collection(collection){
                this.collection = collection;
                return this;
            }

            target(target){
                this.target = target;
                return this;
            }

            build() {
                return new DatabaseContext(this);
            }
        }
        return Builder;
    }
}

module.exports = DatabaseContext;
