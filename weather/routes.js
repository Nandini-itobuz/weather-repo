const express = require('express')
const weatherRouter = express.Router();

const {getData,updateData,findPlace} = require('./controllers');

weatherRouter.route('/').get(getData).post(updateData);
weatherRouter.route("/:place").get(findPlace)

module.exports = weatherRouter;