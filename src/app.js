let express = require('express');
let app = express();
require('./db/db');

let medicine = require('./routing/Medicine');
app.use(express.json());
app.use(medicine);

app.get('/', (req, res) => {
    res.status(200).send("App is running");
})

module.exports = app;