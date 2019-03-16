let mongoose = require('mongoose');

const config = {
    user: 'admin',
    pass: 'herokumongo123',
    host: '127.0.0.1',
    port: '27017',
    database: 'swift-match'
};

// const url = `mongodb://${config.user}:${config.pass}@${config.host}:${config.port}/${config.database}`;
const url = `mongodb://${config.host}:${config.port}/${config.database}`;
mongoose.connect(url, {useNewUrlParser: true});

module.exports = mongoose.connection;
