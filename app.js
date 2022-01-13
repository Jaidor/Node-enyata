const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const APIROUTES = require('./routes/appRoutes');
const bodyParser = require('body-parser');
/* Express */
const app = express();

/* database connections */
const db = 'mongodb://netninja:d3dTdThYc7ZDe2rY@nodetuts-shard-00-00.piho0.mongodb.net:27017,nodetuts-shard-00-01.piho0.mongodb.net:27017,nodetuts-shard-00-02.piho0.mongodb.net:27017/node-tuts?ssl=true&replicaSet=atlas-11498f-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Middleware */
app.use(morgan('dev'));

app.use('/api/', APIROUTES);

app.get('/', (req, res) => {
    res.send('Silence is Golden...');
});