const express = require('express');
const cors = require('cors');
const knex = require('./knex');

const songTime = 10;
let reservations = [{songId: 0, songName: "HANABI", artistName : "mr.children", },{songId: 1, songName: "ultra soul", artistName : "B'z"}];


function setUpServer() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    })

    // reservations
    app.get('/reservations', (req, res) => {
        res.json(reservations);
    })

    app.post('/reservations', (req, res) => {
        req.body.forEach(song => {
            knex.queryBuilder()
            .select('songs.id as songId','songs.name as songName', 'artists.name as artistName' )
            .from('songs')
            .innerJoin('artists', 'artists.id', 'songs.artist_id')
            .where('songs.id', song.songId)
            .then(results => {
                results.forEach(song => reservations.push(song));
                res.json(reservations);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })

        })
    })

    app.delete('/reservations', (req, res) => {
        reservations.splice( req.query.index, 1 );
        res.json(reservations);
    });

    app.put('/reservations', (req, res) => {
        let newReservations = [];

        Promise.all(req.body.map(song => {
            return knex.select('songs.id as songId', 'songs.name as songName', 'artists.name as artistName')
                .from('songs')
                .innerJoin('artists', 'artists.id', 'songs.artist_id')
                .where('songs.id', song.songId);
        }))
        .then(results => {
            newReservations = results.flat();
            reservations = newReservations.map( list => ({...list}));
            res.status(200).json(reservations);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });

    // artists
    app.get('/artists', (req, res) => {
        knex('artists').select('id','name')
        .then(results => res.json(results))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });

    app.post('/artists', (req,res) => {
        req.body.forEach( obj => {
            knex('artists')
            .insert({name: obj.name})
            .returning('id')
            .then(id => {
                res.json([{
                    id: id,
                    name: obj.name
                }]);
            })
        })
    });

    // songs
    app.get('/songs', (req, res) => {
        knex.queryBuilder()
        .select('songs.id','songs.name as name', 'artists.name as artistName' )
        .from('songs')
        .innerJoin('artists', 'artists.id', 'songs.artist_id')
        .then(results => res.json(results))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });

    app.get('/songs', (req, res) => {
        k
    })

    app.get('/:artistIdorName/songs', (req, res) => {
        const artistIdorName = req.params.artistIdorName;
        if (!isNaN(Number(artistIdorName))) {
            // id
            knex.queryBuilder()
            .select('songs.id','songs.name as name', 'artists.name as artistName' )
            .from('songs')
            .innerJoin('artists', 'artists.id', 'songs.artist_id')
            .where('artists.id', artistIdorName)
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
             })
        } else {
            // name
            knex.queryBuilder()
            .select('songs.id','songs.name as name', 'artists.name as artistName' )
            .from('songs')
            .innerJoin('artists', 'artists.id', 'songs.artist_id')
            .where('artists.name', artistIdorName)
            .then(results => res.json(results))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })

        }
    });

    app.post('/:artistId/songs', (req, res) => {
        const artistId = req.params.artistId;
        if (isNaN(Number(artistId))) {
            res.sendStatus(400);
        } else {
            req.body.forEach( obj => {
                knex('songs')
                .insert({name: obj.name, artist_id: artistId})
                .returning('id')
                .then(id => {
                    res.json([{
                        id: id,
                        name: obj.name, 
                        artist_id: artistId
                    }]);
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })
            })
        }
    });

    



    return app;
}

module.exports = setUpServer;
