module.exports =
    {
        HabrParser: {
            KEY: 'HabrParser',
            DOMEN: 'https://habr.com',
            PRIMAL_URL: 'https://habr.com/ru/flows/develop/',
            selectors: {
                posts_list_selector: '.content-list > li',
                hubs_list_selector: '.post__hubs > li',
                article_link_selector: 'article > div > a',
                pagination_links_selector: '.toggle-menu_pagination > li',
                post_wrapper_selector: '.post__wrapper',
                post_header_selector: '.post__title-text',
                post_time_selector: '.post__time',
            }
        },
        MediumParser: {
            KEY: 'MediumParser',
            DOMEN: 'https://medium.com/',
            PRIMAL_URL: 'https://medium.com/search?q=',
            SEARCH_URL: 'https://medium.com/search?q=',
            selectors: {
                posts_list_selector: '.js-postListHandle',
                article_link_selector: '.postArticle > .postArticle-content > a',
                pagination_links_selector: '.toggle-menu_pagination > li',
                post_wrapper_selector: 'article > div > section > div > div',
                post_header_selector: 'div > div > h1',
                post_time_selector: '.post__time',
            }
        }
    };