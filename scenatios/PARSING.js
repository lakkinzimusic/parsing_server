let DB = require('../utils/DB');
let ParserStrategy = require('../utils/parsers/ParserStrategy');
let Writer = require('../utils/Writer');
let parsers_config = require('../config/sites_config');
let Parsers = []
let writer = new Writer();
let db = new DB();

async function PARSING() {
    await find_parsers();
    await init_strategies();
    await parsing();
}

let parsers = [];
let parser_info = {};

async function find_parsers() {
    let parsers = []
    for (let parser in parsers_config) {
        if (parsers_config[parser].active) {
            parsers.push(parsers_config[parser].KEY)
        }
    }
    for await (let parser of parsers) {
        let p = require('../utils/parsers/concrete_parsers/' + parser)
        Parsers.push(p);
    }
}

function init_strategies() {
    parsers = Parsers.map(parser => {
        let obj = new parser(parsers_config[parser.name])
        return new ParserStrategy(obj);
    });
    Parsers = [];
}

async function parsing() {
    for await (let parser of parsers) {
        parser_info = await parser.parsing_main();
        parser = await db.article_info_forming(parser_info);
        let exist = await db.writeDbInfo(parser_info.articles);
        await writer.makeDirectory();
        for await (let article of   parser_info.articles) {
            if (!article.existing) {
                await writer.writeFileArticle(article);
            }
        }
    }
    parsers = [];
}


module.exports = PARSING;