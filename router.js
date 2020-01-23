'use strict';
const fs = require('fs');
class Router {
    static find(path, routes) {
        for (let route in routes) {
            if (path === route) return routes[route];
        }
        return false;
    }
   static getRoutes(port) {
        return new Promise(function (resolve) {
            fs.readFile('routes.json', {encoding: 'utf8'}, function (error, routes) {
                if (!error) {
                    resolve({
                        port: port,
                        routes: JSON.parse(routes)
                    });
                }
            });
        });
    }
}

module.exports = Router;