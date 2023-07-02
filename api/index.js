require('dotenv').config();
require('./config/db.js');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/index.js');

const app = express();

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.disable('x-powered-by');

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on: http://localhost:${port}`));