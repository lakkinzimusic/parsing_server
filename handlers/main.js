'use strict';
let fs = require('fs').promises;
const PARSING = require('../scenatios/PARSING');
const READING = require('../scenatios/READING');
const CLEAN_DB = require('../scenatios/CLEAN_DB');

class Main {
    static async index(response) {
        let res = {}
        res.articles = require('../utils/db.json');
        res.tags = require('../config/tags.js');
        response.end(JSON.stringify(res));
    }

    static parsing(response) {
        console.log('parsing')
    }

    static reading(response) {
    }

    static clean_db(response) {

    }
}

module.exports = Main;