const mongo = require('../mongodb');

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
    }

};