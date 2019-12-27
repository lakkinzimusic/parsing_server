let needle = require('needle');
let cheerio = require('cheerio');
let Writer = require('../Writer');
let tags = require('../../config/tags');
let DB = require('../DB');

class ParserStrategy {
    constructor(parser, config) {
        this.strategy = {};
        switch (parser) {
            case 'HabrParser':
                this.strategy = new HabrParser(config);
                break;
            case 'MediumParser':
                this.strategy = new MediumParser(config);
                break;
        }
        this.strategy.articles = []

    }

    async parsing_main() {
        await this.strategy.parse();
        return this.strategy;
    }

    async parse() {
        throw new Error('Parser method needs to be overridden.')
    }
}


class MediumParser extends ParserStrategy {
    constructor(config) {
        super();
        this.PRIMAL_URL = config.PRIMAL_URL;
        this.SEARCH_URL = config.SEARCH_URL;
        this.DOMEN = config.DOMEN
        this.selectors = config.selectors
        // console.log('MediumParser created')
    }

    async parse() {
        console.log('medium begin')
        let articles_links = await this.getArticlesLinksFromPrimalURL(this.SEARCH_URL);
        await this.getArticles(articles_links)
        console.log('medium end');
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
            // console.log(article.header)
            this.articles.push(article)
        }
    }
}


class HabrParser extends ParserStrategy {
    constructor(config) {
        super();
        this.PRIMAL_URL = config.PRIMAL_URL;
        this.DOMEN = config.DOMEN
        this.selectors = config.selectors
    }

    async parse() {
        console.log('habr begin');
        let articles_links = await this.getArticlesLinksFromPrimalURL(this.PRIMAL_URL);
        await this.getArticles(articles_links);
        console.log('habr end');
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
                // console.log('end pages')
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
module.exports = ParserStrategy;


