#!/usr/bin/env node
const inquirer = require('inquirer');
let prompt_schema = require('./config/prompt_schema');
const PARSING = require('./scenatios/PARSING')
const READING = require('./scenatios/READING')
const CLEAN_DB = require('./scenatios/CLEAN_DB')

async function GO() {
    let answers = await inquirer.prompt(prompt_schema.scenario);
    switch (answers.scenario) {
        case 'parsing' : {
            PARSING();
            break;
        }
        case 'reading' : {
            READING();
            break;
        }
        case 'cleaning database' : {
            CLEAN_DB();
            break;
        }
    }
}


GO();