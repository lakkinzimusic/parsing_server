const config = require('./config')
let fs = require('fs').promises;
let fs_2 = require('fs');
const DB = require('./DB')

class Writer {
    constructor(name, selectors) {
        this.name = name;
        this.selectors = selectors;
        this.count = 0
    }

    async makeDirectory() {
        fs_2.exists(`${config.DIR}/`, async (exist) => {
            if(!exist){
                await fs.mkdir(`${config.DIR}`);
            }

        })
    }

    async writeFileArticle(article) {
        if (article.header) {
            article.header = article.header.replace(/[\\/:"*?<>|]/g, '');
        }
        else {
            article.header = this.count;
            this.count = this.count++
        }
        await  fs.writeFile(`${config.DIR}/${article.article_info.id}.html`, article.html)
    }


    getDate() {
        let d = new Date();
        let day = d.getDate() - 1;
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return day + "." + month + "." + year;
    }
}

module.exports = Writer;