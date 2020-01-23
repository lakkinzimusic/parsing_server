'use strict';
let fs = require('fs').promises;
const PARSING = require('../scenatios/PARSING');
const DB = require('../utils/DB');

class Articles {
    static async open_article(req, res) {
        let article_id = req.body.id;
        let articles = await fs.readdir(process.cwd() + '/library');
        let need_name = ''
        articles.forEach(async filename => {
            filename = filename.substring(0, filename.lastIndexOf('.'))
            if(article_id == filename){
                need_name = article_id + '.html'
            }
        })
        let need_article = await fs.readFile(process.cwd() + '/library/' + need_name, 'utf-8')
        let response = JSON.stringify(need_article)
        console.log(response)
        res.send(response);
    }


}

module.exports = Articles;