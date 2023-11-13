const chai = require('chai');
const chaiHttp = require('chai-http');
const setUpServer = require('../src/server/server');

chai.use(chaiHttp);
const expect = chai.expect
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
        console.log(res.body);
        res.body.length.should.to.equal(3);
    });
})