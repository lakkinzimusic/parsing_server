'use strict';
const http = require('http'),
    fs   = require('fs'),
    url  = require('url');

const Router = require('./router');

class Server {
    static start(port) {
        this.getRoutes(port).then(this.createServer);
    }

    static getRoutes(port) {
        return new Promise(function(resolve) {
            fs.readFile('routes.json', { encoding: 'utf8' }, function(error, routes) {
                if (!error) {
                    resolve({
                        port: port,
                        routes: JSON.parse(routes)
                    });
                }
            });
        });
    }

    static createServer(settings) {
        http.createServer(function(request, response) {
            let path = url.parse(request.url).pathname;
            let route = Router.find(path, settings.routes);
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            });
            try {
                let handler = require('./handlers/' + route.handler);
                handler[route.action](response);
            } catch(e) {
                response.writeHead(500);
                response.end();
            }
        }).listen(settings.port);
    }
}

Server.start(3001);




// #!/usr/bin/env node
// const inquirer = require('inquirer');
// let prompt_schema = require('./config/prompt_schema');
// const PARSING = require('./scenatios/PARSING');
// const READING = require('./scenatios/READING');
// const CLEAN_DB = require('./scenatios/CLEAN_DB');
//
// async function GO() {
//     let answers = await inquirer.prompt(prompt_schema.scenario);
//     switch (answers.scenario) {
//         case 'parsing' : {
//             PARSING();
//             break;
//         }
//         case 'reading' : {
//             READING();
//             break;
//         }
//         case 'cleaning database' : {
//             CLEAN_DB();
//             break;
//         }
//     }
// }
//
//
// GO();