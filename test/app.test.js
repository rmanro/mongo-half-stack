const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Bands', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('bands').remove();
        });
    });

    let band = {
        name: 'Preoccupations',
        city: 'Calgary'
    };

    let band2 = {
        name: 'Shame',
        city: 'London'
    };

    it('POST - Saves a band', () => {
        return chai.request(app)
            .post('/bands')
            .send(band)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, band.name);
                band = body;
            });
    });

    it('Add second band', () => {
        return chai.request(app)
            .post('/bands')
            .send(band2)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, band2.name);
                band2 = body;
            });
    });

    it('GET - array of all bands', () => {
        return chai.request(app)
            .get('/bands')
            .then(({ body }) => {
                assert.equal(body.length, 2);
            });
    });

    it('GET - one band by id', () => {
        return chai.request(app)
            .get(`/bands/${band._id}`)
            .then(result => {
                assert.equal(result.body.name, band.name);
            });
    });

    it('GET - 404 error on bad id given', () => {
        return chai.request(app)
            .get('/bands/5ad1098df666666dfbc9b8aa')
            .then(result => {
                assert.equal(result.statusCode, 404);
            });
    });

    it('DELETE - band by id', () => {
        return chai.request(app)
            .del(`/bands/${band._id}`)
            .then(result => {
                assert.equal(result.text, '{"n":1,"ok":1}');
            });
    });

    it('PUT - update a band', () => {
        band2.city = 'London, UK';
        return chai.request(app)
            .put(`/bands/${band2._id}`)
            .send(band2)
            .then(result => {
                assert.equal(result.text, '{"n":1,"nModified":1,"ok":1}');
            });
    });

    after(() => mongo.client.close());

});