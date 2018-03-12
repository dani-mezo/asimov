class Book {
    constructor(build) {
        this.author = build.author;
        this.title = build.title;
        this.name = build.name;
        this.date = build.date;
        this.type = build.type;
    }
    static get Builder() {
        class Builder {
            constructor() {
            }

            author(author){
                this.author = author;
                return this;
            }

            title(title){
                this.title = title;
                return this;
            }

            name(name){
                this.name = name;
                return this;
            }

            date(date){
                this.date = date;
                return this;
            }

            type(type){
                this.type = type;
                return this;
            }

            build() {
                return new Book(this);
            }
        }
        return Builder;
    }
}

module.exports = Book;