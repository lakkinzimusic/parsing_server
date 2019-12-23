let tress = require('tress');
let needle = require('needle');
let cheerio = require('cheerio');
let fs = require('fs');
let DOMEN = 'https://habr.com';
let URL = 'https://habr.com/ru/flows/develop/';
let results = [];
const [, , ...args] = process.argv;
let dir = args[0];
let tag = 'JavaScript';
var articles_links = [];
var pages = [];

var q = tress(function (url, callback) {
    needle.get(url, function (err, res) {
        if (err) throw err;
        // парсим DOM
        var $ = cheerio.load(res.body);
        // post__body_crop
        $('.content-list > li').toArray().map(x => {
            $(x).find('ul > li').toArray().map(y => {
               let hub = $(y).find('a').text();
               if(hub === tag){
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
                    let text = $('.post__wrapper').text()
                    let html = $('.post__wrapper');
                    let header = $('.post__title-text').text();
                    makeDirectory();
                    writeFiles(header, html);
                    callback();
                });
            }, 10);
            q_2.push(articles_links)
            return
        }
        // q.push(articles_links)
        q.push(pages)
        callback();
    });
}, 10); // запускаем 10 параллельных потоков



function makeDirectory(){
    if (!fs.existsSync('./' + getDate())) {
        fs.mkdirSync('./' + getDate());
    }
}

function writeFiles(header, html){

   header = header.replace(/[\\/:"*?<>|]/g, '')
    fs.writeFileSync(`./${getDate()}/${header}.html`, html, (err) => {

    });
}


q.drain = function () {
    fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
}

q.push(URL);

function getDate(date) {
    let d=new Date();
    let day=d.getDate();
    let month=d.getMonth() + 1;
    let year=d.getFullYear();
   return day + "." + month + "." + year;
}