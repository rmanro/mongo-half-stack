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

    after(() => {
        const band2 = {
            name: 'Shame',
            city: 'London'
        };
        return chai.request(app)
            .post('/bands')
            .send(band2);
    });

    after(() => mongo.client.close());

});