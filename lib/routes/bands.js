const notFound = require('./not-found');
const band = require('../models/band');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    if(id.length != 24) {
        notFound(req, res);
    }
    else {
        band.SelectOne(id)
            .then(band => {
                if(!band) {
                    res.statusCode = 404;
                    res.send(band);
                }
                else {
                    res.send(band);
                }
            });
    }
};

const getAll = (req, res) => {
    band.find().then(bands => {
        res.send(bands);
    });
};

const post = (req, res) => {
    band.insert(req.body). then(saved => {
        res.send(saved);
    });
};

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};