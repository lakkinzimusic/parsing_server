#!/usr/bin/env node
let Parser = require('./Parser');
let ParserStrategy = require('./ParserStrategy');
let habr_config = require('./sites_config').habr_config;



// let habr_parser = new Parser(habr_config);
/*
// async function Parsing() {
//     await habr_parser.parse();
//     console.log(`Parsing successfully finished. ${habr_parser.articles_counter} with your tags were published yesterday.`)
// }*/
// Parsing();
console.log(habr_config.KEY)
let habr_parser = new ParserStrategy(habr_config)

// function init_Strategy() {
//     let habr_parser = new ParserStrategy(habr_config)
//     habr_parser.ContextInterface()
//
// }