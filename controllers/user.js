const routes = require('express').Router();
const mongodb = require('../db/connect');

routes.get('/user', (req, res) => {
    const users = mongodb.getDb().collection('users').find().toArray();
    res.send(users);
});

module.exports = routes;
