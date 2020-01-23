'use strict';
let fs = require('fs').promises;
const PARSING = require('../scenatios/PARSING');
const DB = require('../utils/DB');

class Parsing {
    static async parse(req, res) {
        await PARSING();
        let articles = await DB.get_actual_db();
        res.send(articles);
    }

    static async get_all_parsers(req, res) {
        let parsers_config = require('../config/sites_config');
        res.send(parsers_config);
    }

    static async change_parser_activity(req, res) {
        let parsers_config = require('../config/sites_config');
        let parser = req.body;
        for (let static_parser in parsers_config) {
            if (parser.KEY === parsers_config[static_parser].KEY) {
                parsers_config[static_parser].active = !parsers_config[static_parser].active
            }
        }
        let str = "module.exports = " + JSON.stringify(parsers_config) + ";";
        await fs.writeFile('config/sites_config.js', str)
        res.send(parsers_config);
    }
}

module.exports = Parsing;