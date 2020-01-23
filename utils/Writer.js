const config = require('../config/config')
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
            if (!exist) {
                await fs.mkdir(`${config.DIR}`);
            }

        })
    }

    async copyFiles(filtered_json) {
        for await (let json of filtered_json) {
            json.header = json.header.replace(/[\\/:"*?<>|]/g, '');
            await fs.copyFile(`${config.DIR}/${json.id}.html`, `${config.tmp_folder}/${json.header}.html`)
        }
    }

    async removeTempFolder() {
        await fs.rmdir(config.tmp_folder, {recursive: true});
    }


    async removeLibraryFolder() {
        await fs.rmdir(config.DIR, {recursive: true});
    }

    async makeTempFolder() {
        fs_2.exists(`${config.DIR}/`, async (exist) => {
            if (!exist) {
                await fs.mkdir(`${config.tmp_folder}`);
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
        await fs.writeFile(`${config.DIR}/${article.article_info.id}.html`, article.html)
    }


}

module.exports = Writer;