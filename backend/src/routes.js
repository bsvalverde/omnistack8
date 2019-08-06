const express = require('express');
const DevController = require('./controllers/DevController');
const DislikeController = require('./controllers/DislikeController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.post('/dev', DevController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
routes.post('/devs/:devId/likes', LikeController.store);

module.exports = routes;
