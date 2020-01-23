'use strict';
let fs = require('fs').promises;
const PARSING = require('../scenatios/PARSING');
const READING = require('../scenatios/READING');
const CLEAN_DB = require('../scenatios/CLEAN_DB');
const DB = require('../utils/DB');

class Main {
    static async index(request, response) {
        let res = {};
        let articles = await DB.get_actual_db();
        response.send(articles);
    }

    static async clean_db(request, response) {
        await CLEAN_DB();
        let articles = await DB.get_actual_db();
        response.send(articles);
    }



}

module.exports = Main;