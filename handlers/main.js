'use strict';
let fs = require('fs').promises;
const PARSING = require('../scenatios/PARSING');
const READING = require('../scenatios/READING');
const CLEAN_DB = require('../scenatios/CLEAN_DB');

class Main {
    static async index(request, response) {
        let res = {}
        res.articles = require('../utils/db.json');
        res.tags = require('../config/tags.js');
        response.end(JSON.stringify(res));
    }

    static add_tags(request, response) {
        let tags = require('../config/tags.js');
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
            console.log(body)
        });
        // console.log(response)
        // console.log(request)
        response.end(JSON.stringify(request));
    }

    static reading(response) {
    }

    static clean_db(response) {

    }
}

module.exports = Main;