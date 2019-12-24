#!/usr/bin/env node
let tress = require('tress');
let needle = require('needle');
let cheerio = require('cheerio');
let fs = require('fs');
let DOMEN = 'https://habr.com';
let URL = 'https://habr.com/ru/flows/develop/';
const [, , ...args] = process.argv;
let DIR = args[0];
if (DIR.substr(-1) === '/') {
    DIR = DIR.substring(0, DIR.length - 1)
}
let articles_counter = 0;
let tag = 'JavaScript';
let tags = require('./tags');
let articles_links = [];
let pages = [];
pages.push(URL)
Parsing(pages, articles_links);

async function Parsing() {
    console.log()
    await getPages(pages)
    await getArticles(articles_links)
    console.log(`Parsing successfully finished. ${articles_counter} with your tags were published yesterday.`)
}


async function getPages(pages) {
    for (let url of pages) {
        let res = await needle("get", url);
        let $ = cheerio.load(res.body);
        let posts = $('.content-list > li').toArray();
        posts.map(post => {
            let hubs = $(post).find('.post__hubs > li').toArray()
            hubs = hubs.map(hub => $(hub).find('a').text());
            let include = hubs.some(hub => tags.includes(hub))
            if (include) {
                let link = $(post).find('article > div > a').attr('href');
                if (link) articles_links.push(link)
            }
        });

        let pagination_objects = $('.toggle-menu_pagination > li').toArray()
        pagination_objects.forEach(obj => {
            let link = $(obj).find('a').attr('href');
            if (link) {
                if (pages.indexOf(link) < 0) {
                    pages.push(DOMEN + link)
                }
            }
        })
        if (pages.length > 49) {
            console.log('end pages')
            return
        }
    }
}


async function getArticles(articles_links) {
    for (let url of articles_links) {
        let res = await needle("get", url)
        let $ = cheerio.load(res.body);
        let html = $('.post__wrapper');
        let time = html.find('.post__time').text()
        if (time.includes('вчера')) {
            let header = $('.post__title-text').text();
            makeDirectory();
            writeFiles(header, html);
            articles_counter++
        }
    }

}

function makeDirectory() {
    if (!fs.existsSync(`${DIR}/` + getDate())) {
        fs.mkdirSync(`${DIR}/` + getDate());
    }
}

function writeFiles(header, html) {

    header = header.replace(/[\\/:"*?<>|]/g, '');

    fs.writeFileSync(`${DIR}/${getDate()}/${header}.html`, html, (err) => {

    });
}


function getDate() {
    let d = new Date();
    let day = d.getDate() - 1;
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return day + "." + month + "." + year;
}