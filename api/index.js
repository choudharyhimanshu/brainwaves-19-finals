const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

require('./db-connection');
const routes = require('./routes');

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(parser.urlencoded({
    extended: true
}));
app.use(parser.json());

app.use('/', routes);

app.listen(port, function () {
    console.log("Running api on port " + port);
});
