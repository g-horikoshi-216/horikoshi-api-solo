const express = require('express');
const cors = require('cors');

function setUpServer() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    })



    return app;
}

module.exports = setUpServer;
