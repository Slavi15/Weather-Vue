require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function main() {
    await client.connect();
    await client.db('weather-vue').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
};

main()
    .then(res => console.log(res))
    .catch(err => console.log(err));

const database = client.db('weather-vue');
module.exports = database;