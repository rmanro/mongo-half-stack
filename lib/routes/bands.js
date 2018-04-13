const notFound = require('./not-found');
const band = require('../models/band');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    band.SelectOne(id)
        .then(band => {
            res.end(band);
        });
};

const getAll = (req, res) => {
    band.find().then(bands => {
        res.end(bands);
    });
};

const methods = { get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};