let DB = require('../utils/DB');
let ParserStrategy = require('../utils/parsers/ParserStrategy');
let Writer = require('../utils/Writer');
let habr_config = require('../config/sites_config').habr_config;
let medium_config = require('../config/sites_config').medium_config;

let writer = new Writer();
let db = new DB();

async function PARSING() {
    await init_Strategies();
    await parsing();
}

let parsers = [];
let parser_info = {};

function init_Strategies() {
    let habr_parser = new ParserStrategy(habr_config.KEY, habr_config)
    let medium_parser = new ParserStrategy(medium_config.KEY, medium_config);
    parsers.push(medium_parser, habr_parser)
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