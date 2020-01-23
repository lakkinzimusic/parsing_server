'use strict';
const express = require('express');
const app = express();
const url = require('url');
const cors = require('cors')
const bodyParser = require('body-parser')
const router = express.Router();
const Router = require('./router');
let handler = null;
let route = null;
app.use(cors());

app.use(async (req, res, next) => {
    let settings = await Router.getRoutes(3001);
    let path = url.parse(req.url).pathname;
    route = await Router.find(path, settings.routes);
    handler = require('./handlers/' + route.handler);
    next()
});
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use((req, res) => {
    handler[route.action](req, res);
});


app.listen(3001);



