let needle = require('needle');
let cheerio = require('cheerio');
let tags = require('../../../config/tags');

class HabrParser  {
    constructor(config) {
        this.PRIMAL_URL = config.PRIMAL_URL;
        this.DOMEN = config.DOMEN
        this.selectors = config.selectors
    }

    async parse() {
        let articles_links = await this.getArticlesLinksFromPrimalURL(this.PRIMAL_URL);
        await this.getArticles(articles_links);
    }


    async getArticlesLinksFromPrimalURL(PRIMAL_URL) {
        let pages = [];
        let articles_links = [];
        pages.push(PRIMAL_URL);
        for (let url of pages) {
            let res = await needle("get", url);
            let $ = cheerio.load(res.body);
            let posts = $(this.selectors.posts_list_selector).toArray();
            posts.map(post => {
                let hubs = $(post).find(this.selectors.hubs_list_selector).toArray()
                hubs = hubs.map(hub => $(hub).find('a').text());
                let include = hubs.some(hub => tags.includes(hub))
                if (include) {
                    let link = $(post).find(this.selectors.article_link_selector).attr('href');
                    if (link) articles_links.push(link)
                }
            });
            let pagination_objects = $(this.selectors.pagination_links_selector).toArray();
            pagination_objects.forEach(obj => {
                let link = $(obj).find('a').attr('href');
                if (link) {
                    if (pages.indexOf(link) < 0) {
                        pages.push(this.DOMEN + link)
                    }
                }
            });
            if (pages.length > 49) {
                return articles_links
            }
        }
    }

    async getArticles(articles_links) {
        for (let url of articles_links) {
            let article = {}
            let res = await needle("get", url)
            let $ = cheerio.load(res.body);
            article.html = $(this.selectors.post_wrapper_selector);
            let time = article.html.find(this.selectors.post_time_selector).text()
            if (time.includes('вчера')) {
                article.header = $(this.selectors.post_header_selector).text();
                this.articles.push(article)
            }
        }
    }
}

module.exports = HabrParser;