#!/usr/bin/env node
let tress = require('tress');
let needle = require('needle');
let cheerio = require('cheerio');
let fs = require('fs');
let DOMEN = 'https://habr.com';
let URL = 'https://habr.com/ru/flows/develop/';
let results = [];
const [, , ...args] = process.argv;
let DIR = args[0];
if (DIR.substr(-1) === '/') {
    DIR = DIR.substring(0, str.length - 1)
}
let articles_counter = 0;
let tag = 'JavaScript';
let tags = require('./tags');
var articles_links = [];
var pages = [];
console.log('begin');
var q = tress(function (url, callback) {
    needle.get(url, function (err, res) {
        if (err) throw err;
        // парсим DOM
        var $ = cheerio.load(res.body);
        // post__body_crop
        $('.content-list > li').toArray().map(x => {
            $(x).find('ul > li').toArray().map(y => {
                let hub = $(y).find('a').text();
                if (tag.indexOf(hub) > -1) {
                    let link_1 = $(x).find('li >  article > div > a').attr('href');
                    if (link_1) {
                        articles_links.push(link_1)
                    }
                }
            });
        });
        $('.toggle-menu_pagination > li').toArray().map(x => {
            let link = $(x).find('a').attr('href');
            if (link) {
                if (pages.indexOf(link) < 0) {
                    pages.push(DOMEN + link)
                }
            }
        });
        if (pages.length >= 50) {

            var q_2 = tress(function (url, callback) {
                needle.get(url, function (err, res) {
                    let $ = cheerio.load(res.body);
                    let html = $('.post__wrapper');
                    let time = html.find('.post__time').text()
                    // console.log(time)
                    if (time.includes('вчера')) {
                        let header = $('.post__title-text').text();
                        // makeDirectory();
                        // writeFiles(header, html);
                        articles_counter++
                    }

                    callback();
                });
            }, 10);

            q_2.push(articles_links);

            console.log('articles_links: ' + articles_links.length)
            articles_links = [];
            if (articles_links.length === 0) {
                console.log('3')
                console.log(`Parsing successfully completed. Yesterday was published ${articles_counter} articles on your tags`);
                return
            }
        }
        // q.push(articles_links)
        q.push(pages)
        callback();

    });
}, 10); // запускаем 10 параллельных потоков


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


q.push(URL);

function getDate() {
    let d = new Date();
    let day = d.getDate() - 1;
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return day + "." + month + "." + year;
}