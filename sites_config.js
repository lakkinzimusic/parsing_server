module.exports =
    {
        habr_config: {
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
        }
    };