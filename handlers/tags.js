'use strict';
let fs = require('fs').promises;

class Tags {
    static async add_tag(req, res) {
        let tags = require('../config/tags.js');
        tags.push(req.body.tag)
        tags = tags.join("','")
        await fs.writeFile('config/tags.js', `module.exports = ['${tags}']`)
        res.send(JSON.stringify(req.body.tag));
    }
    static async delete_tag(req, res) {
        let tags = require('../config/tags.js');
        tags = tags.filter(item => item !== req.body.tag);
        tags = tags.join("','");
        tags = "module.exports = ['" + tags + "']";
        await fs.writeFile('config/tags.js', tags)
        res.send(JSON.stringify(req.body.tag));
    }
    static async get_tags(req, res) {
        let tags = require('../config/tags.js');
        res.send(tags);
    }

}

module.exports = Tags;