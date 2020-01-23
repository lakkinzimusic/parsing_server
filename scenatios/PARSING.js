let DB = require('../utils/DB');
let ParserStrategy = require('../utils/parsers/ParserStrategy');
let HabrParser = require('../utils/parsers/concrete_parsers/HabrParser');
let MediumParser = require('../utils/parsers/concrete_parsers/MediumParser');
let Writer = require('../utils/Writer');
let parsers_config = require('../config/sites_config');
let Parsers = [HabrParser, MediumParser]
let writer = new Writer();
let db = new DB();

async function PARSING() {
    await init_strategies();
    await parsing();
}

let parsers = [];
let parser_info = {};

function init_strategies() {
    parsers = Parsers.map(parser => {
        let obj = new parser(parsers_config[parser.name])
        return new ParserStrategy(obj);
    });
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
}


module.exports = PARSING;