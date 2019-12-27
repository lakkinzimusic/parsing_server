const inquirer = require('inquirer');
let prompt_schema = require('../config/prompt_schema');

let Writer = require('../utils/Writer');
let DB = require('../utils/DB');

let writer = new Writer();
let db = new DB();


async function READING() {
   let answers = await inquirer.prompt(prompt_schema.search);
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


module.exports = READING;