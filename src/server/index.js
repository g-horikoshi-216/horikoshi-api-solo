const server = require('./server');

const app = server.setUpServer();

app.listen(3000, () => {
    console.log("sercer works!");
})