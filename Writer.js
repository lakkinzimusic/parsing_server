const config = require('./config')
let fs = require('fs');

class Writer {
    constructor(name, selectors) {
        this.name = name;
        this.selectors = selectors;
    }

    makeDirectory() {
        if (!fs.existsSync(`${config.DIR}/` + this.getDate())) {
            fs.mkdirSync(`${config.DIR}/` + this.getDate());
        }
    }

    writeArticle(article) {
        article.header = article.header.replace(/[\\/:"*?<>|]/g, '');
        fs.writeFileSync(`${config.DIR}/${this.getDate()}/${article.header}.html`, article.html, (err) => {
        });
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