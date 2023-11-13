const express = require('express');
const cors = require('cors');
const knex = require('./knex');

const reservationsMock = [{id: 0, artist : "mr.children", song: "HANABI"},{id: 1, artist : "B'z", song: "ultra soul"}];
const artistsMock = [ {id: 0, artist: "mr.children"}, {id:1, artist: "B'z"}];
const songsMock = [ {id: 0, artist: "mr.children", song:"HANABI"}, {id: 1, artist : "B'z", song: "ultra soul"}];

function setUpServer() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    })

    app.get('/reservations', (req, res) => {
        res.status(200).json(reservationsMock);
    })



    return app;
}

module.exports = setUpServer;
