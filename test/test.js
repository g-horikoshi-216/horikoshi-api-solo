const chai = require('chai');
const chaiHttp = require('chai-http');
const serversrc = require('../src/server/server');

chai.use(chaiHttp);
chai.should();

const server = serversrc.setUpServer();

describe('livedam server test', () => {
    it ('GET /healthcheck' , async () => {
        const res = await chai.request(server).get('/healthcheck');
        res.status.should.to.equal(200);
    });

    xit ('GET /reservations' , async () => {
        const res = await chai.request(server).get('/reservations');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(2);
    });

    xit ('GET /artists' , async () => {
        const res = await chai.request(server).get('/artists');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(5);
    });

    xit ('GET /songs' , async () => {
        const res = await chai.request(server).get('/songs');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(7);
    });

    xit ('GET /:artistsName/songs' , async () => {
        const res = await chai.request(server).get('/mr.children/songs');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(3);
    });

    xit ('GET /:artistsId/songs' , async () => {
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

    xit ('POST /reservations',async () => {
        const res = await  chai.request(server).post('/reservations').send([{songId: "7"}]);
        res.status.should.to.equal(200);
        console.log(res.body);
        res.body.length.should.to.equal(3);
    })

    xit ('DELETE /reservations',async () => {
        const res = await  chai.request(server).delete('/reservations?index=1');
        res.status.should.to.equal(200);
        res.body.length.should.to.equal(2);
    })

    it ('PUT /reservations',async () => {
        const res = await  chai.request(server).put('/reservations')
        .send([{
            songId : 4
        }, {
            songId : 2
        }]);
        res.status.should.to.equal(200);
        console.log(res.body);
        res.body.length.should.to.equal(2);
    });

    it('GET /artists/search?q={songName}', async () => {
        const res = await chai.request(server).get('/artists/search?q=mr.children');
        res.status.should.to.equal(200);
        console.log(res.body);
        res.body.length.should.to.equal(3);
    });

    it('GET /songs/search?q={songName}', async () => {
        const res = await chai.request(server).get('/songs/search?q=OceAN');
        res.status.should.to.equal(200);
        console.log(res.body);
        res.body.length.should.to.equal(1);
    });
    
})

