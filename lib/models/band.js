const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');
module.exports = {
    
    find() {
        return mongo.then(db => {
            return db.collection('bands')
                .find()
                .toArray();
        });
    },

    insert(band) {
        return mongo.then(db => {
            return db.collection('bands')
                .insert(band)
                .then(result => result.ops[0]);
        });
    },

    SelectOne(id) {
        const idObj = { _id: ObjectId(id) };
        return mongo.then(db => {
            return db.collection('bands')
                .findOne(idObj);
        });
    },

    delete(id) {
        // console.log('THE ID:', id);
        const idObj = { _id: ObjectId(id) };
        return mongo.then(db => {
            return db.collection('bands')
                .remove(idObj);
        });
    }

};