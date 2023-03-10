const http = require('http');
const app = require('./app');
const { API_PORT } = process.env;

const normalizePort = ((val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    } else if (port > 0) {
        return port;
    }
})

const port = normalizePort(process.env.PORT || API_PORT);
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on the port: ${port}`)
})