const exp = require('express');
const app = exp();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

const DB_URL = process.env.DB_URL;

MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
    const dbObj = client.db('cinematix');
    const moviesObj = dbObj.collection('moviesCollection');
    const theatresObj = dbObj.collection('theatresCollection');
    const bookingsObj = dbObj.collection('bookingsCollection');
    const usersObj=dbObj.collection('usersCollection');

    app.set('moviesObj', moviesObj);
    app.set('theatresObj', theatresObj);
    app.set('bookingsObj', bookingsObj);
    app.set('usersObj',usersObj);
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});

app.use(exp.json());

app.use((err, req, res, next) => {
    res.send({ message: "error", payload: err.message });
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
