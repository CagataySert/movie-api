const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://cagataySert:leona17051995@cluster0-2gvib.mongodb.net/test?retryWrites=true&w=majority');
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error',err);
    });

    mongoose.Promise = global.Promise;
};