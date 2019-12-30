class ParserStrategy {
    constructor(parser) {
        this.strategy = parser;
        this.strategy.articles = []
    }

    async parsing_main() {
        await this.strategy.parse();
        return this.strategy;
    }

    async parse() {
        throw new Error('Parser method needs to be overridden.')
    }
}


module.exports = ParserStrategy;


