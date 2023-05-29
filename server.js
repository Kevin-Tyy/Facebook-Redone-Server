const app = require('./app');
const http = require('http');
const mongodb = require('./db/mongodb');
const port = 4000;
const server = http.createServer(app);
const startServer = async () => {
    await mongodb()
    server.listen(port , ()=> {
        console.log(`listening on port ${port}`)
    })
}
startServer();