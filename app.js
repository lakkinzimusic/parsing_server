#!/usr/bin/env node
const inquirer = require('inquirer');
let ParserStrategy = require('./utils/parsers/ParserStrategy');
let Writer = require('./utils/Writer');
let prompt_schema = require('./config/prompt_schema');
let DB = require('./utils/DB');
let habr_config = require('./config/sites_config').habr_config;
let medium_config = require('./config/sites_config').medium_config;
let parsers = [];
let writer = new Writer();
let db = new DB()
let parser_info = {};

async function GO() {
    let answers = await inquirer.prompt(prompt_schema.scenario);
    if (answers.scenario == 'parsing') {
        PARSING();
    }
    else {
        answers = await inquirer.prompt(prompt_schema.search);
        await READING(answers);
    }
}


async function READING(answers) {
    let filtered_json = await db.filter_db_json(answers);
    await writer.makeTempFolder();
    await writer.copyFiles(filtered_json);
    let end_of_process = false;
    while (!end_of_process) {
        let answer = await inquirer.prompt(prompt_schema.end_of_reading);
        if (answer.end_of_reading) {
            end_of_process = true
        }
    }
    await writer.removeTempFolder()
    process.exit(22)
}

async function PARSING() {
    await init_Strategies();
    await parsing();
}


function init_Strategies() {
    let habr_parser = new ParserStrategy(habr_config.KEY, habr_config)
    let medium_parser = new ParserStrategy(medium_config.KEY, medium_config);
    parsers.push(habr_parser, medium_parser)
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


GO()