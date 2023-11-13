const chai = require('chai');
const chaiHttp = require('chai-http');
const setUpServer = require('../src/server/server');

chai.use(chaiHttp);
const expect = chai.expect
chai.should();

const server = setUpServer();

describe('livedam server test', () => {
    it ('/healthcheck' , async () => {
        const res = await chai.request(server).get('/healthcheck');
        res.status.should.to.equal(200);
    });
})