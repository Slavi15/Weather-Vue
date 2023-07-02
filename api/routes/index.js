const router = require('express').Router();

const database = require('../config/db.js');
const countryCollection = database.collection('countries');

router.get('/countries', async (req, res) => {
    const results = await countryCollection.find({}).toArray();

    res.send(results).status(200);
});

router.get('/countries/:id', async (req, res) => {
    const query = {
        country: req.params.id
    };
    const result = await countryCollection.findOne(query);

    if (!result) {
        res.send('Country not found!').status(404);
    } else {
        res.send(result).status(200);
    };
});

router.post('/countries', async (req, res) => {
    let newDocument = req.body;
    newDocument.date = new Date();

    const result = await countryCollection.insertOne(newDocument);
    res.send(result).status(201);
});

router.delete('/countries/:id', async (req, res) => {
    const query = {
        _id: ObjectId(req.params.id)
    };

    const result = await countryCollection.deleteOne(query);
    res.send(result).status(410);
});

module.exports = router;