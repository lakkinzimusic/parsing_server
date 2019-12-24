let needle = require('needle');
let cheerio = require('cheerio');
let Writer = require('./Writer');
let tags = require('./tags');

class ParserStrategy {
    constructor(site_config) {
        // console.log(site_config.KEY)
        let construc = site_config.KEY;
        // console.log(construc)
        // console.log(site_config.KEY)
        // myObject();
        // console.log(this[HabrParser])
        // this.strategy = new this[site_config.KEY]();
    }

    ContextInterface (){
        this.strategy.AlgorithmInterface()
    }

    async parse() {
        let articles_links = await this.getArticlesLinksFromPrimalURL(this.PRIMAL_URL);
        await this.getArticles(articles_links);
    }

    // async getArticlesLinksFromPrimalURL(PRIMAL_URL) {
    //     let pages = [];
    //     let articles_links = [];
    //     pages.push(PRIMAL_URL)
    //     for (let url of pages) {
    //         let res = await needle("get", url);
    //         let $ = cheerio.load(res.body);
    //         let posts = $(this.selectors.posts_list_selector).toArray();
    //         posts.map(post => {
    //             let hubs = $(post).find(this.selectors.hubs_list_selector).toArray()
    //             hubs = hubs.map(hub => $(hub).find('a').text());
    //             let include = hubs.some(hub => tags.includes(hub))
    //             if (include) {
    //                 let link = $(post).find(this.selectors.article_link_selector).attr('href');
    //                 if (link) articles_links.push(link)
    //             }
    //         });
    //         let pagination_objects = $(this.selectors.pagination_links_selector).toArray();
    //         pagination_objects.forEach(obj => {
    //             let link = $(obj).find('a').attr('href');
    //             if (link) {
    //                 if (pages.indexOf(link) < 0) {
    //                     pages.push(this.DOMEN + link)
    //                 }
    //             }
    //         });
    //         if (pages.length > 49) {
    //             console.log('end pages')
    //             return articles_links
    //         }
    //     }
    // }
    //
    // async getArticles(articles_links) {
    //
    //     let writer = new Writer()
    //     for (let url of articles_links) {
    //         let article = {}
    //         let res = await needle("get", url)
    //         let $ = cheerio.load(res.body);
    //         article.html = $(this.selectors.post_wrapper_selector);
    //         let time = article.html.find(this.selectors.post_time_selector).text()
    //         if (time.includes('вчера')) {
    //             article.header = $(this.selectors.post_header_selector).text();
    //             writer.makeDirectory();
    //             writer.writeArticle(article);
    //             this.articles_counter++
    //         }
    //     }
    // }
}


class HabrParser extends ParserStrategy {
    constructor() {
        super();
        console.log('HabrParser created')
    }

    AlgorithmInterface (){
        facade.log('HabrParser algorithm')
    }
}

module.exports = ParserStrategy;