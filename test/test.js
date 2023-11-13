const chai = require('chai');
const chaiHttp = require('chai-http');
const setUpServer = require('../src/server/server');

chai.use(chaiHttp);
chai.should();

const server = setUpServer();

describe('livedam server test', () => {
    it ('GET /healthcheck' , async () => {
        const res = await chai.request(server).get('/healthcheck');
        res.status.should.to.equal(200);
    });

    it ('GET /reservations' , async () => {
        const res = await chai.request(server).get('/reservations');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(2);
    });

    it ('GET /artists' , async () => {
        const res = await chai.request(server).get('/artists');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(5);
    });

    it ('GET /songs' , async () => {
        const res = await chai.request(server).get('/songs');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(7);
    });

    it ('GET /:artistsName/songs' , async () => {
        const res = await chai.request(server).get('/mr.children/songs');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(3);
    });

    it ('GET /:artistsId/songs' , async () => {
        const res = await chai.request(server).get('/1/songs');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(3);
    });

    xit ('POST /artists' , async () => {
        const newArtists = [
            {
                name: 'Larc en ciel',
            }
        ]
        const res = await chai.request(server).post('/artists').send(newArtists);
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(1);
    });

    xit ('POST /artistId/songs' , async () => {
        const newSongs = [
            {
                name: '誘惑'
            }
        ]
        const res = await chai.request(server).post('/4/songs').send(newSongs);
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(1);
    });

    it ('POST /reservations',async () => {
        const res = await  chai.request(server).post('/reservations').send([{songId: "7"}]);
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(3);

    })



})