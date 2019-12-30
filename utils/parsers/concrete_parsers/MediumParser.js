let needle = require('needle');
let cheerio = require('cheerio');
let tags = require('../../../config/tags');

class MediumParser  {
    constructor(config) {
        this.PRIMAL_URL = config.PRIMAL_URL;
        this.SEARCH_URL = config.SEARCH_URL;
        this.DOMEN = config.DOMEN
        this.selectors = config.selectors
    }

    async parse() {
        let articles_links = await this.getArticlesLinksFromPrimalURL(this.SEARCH_URL);
        await this.getArticles(articles_links)
    }


    async getArticlesLinksFromPrimalURL(SEARCH_URL) {
        let pages = []
        let articles_links = [];
        pages.push(SEARCH_URL + tags[0]);
        for (let url of pages) {
            let res = await needle("get", url);
            let $ = cheerio.load(res.body);
            let posts = $(this.selectors.posts_list_selector).toArray();
            posts.map(post => {
                let link = $(post).find(this.selectors.article_link_selector).attr('href');
                articles_links.push(link)
            });
            return articles_links
        }
    }

    async getArticles(articles_links) {
        for (let url of articles_links) {
            let article = {};
            let res = await needle("get", url);
            let $ = cheerio.load(res.body);
            article.html = $(this.selectors.post_wrapper_selector);
            let time = article.html.find(this.selectors.post_time_selector).text()
            article.header = $(this.selectors.post_header_selector).text();
            this.articles.push(article)
        }
    }
}


module.exports = MediumParser;