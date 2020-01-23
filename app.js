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
                handler[route.action](request, response);
            } catch(e) {
                response.writeHead(500);
                response.end();
            }
        }).listen(settings.port);
    }
}

Server.start(3001);


