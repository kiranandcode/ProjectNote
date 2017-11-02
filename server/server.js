// enivonment
const env = require('./env');

const app = require('./app')(env);
const http = require('http');

const port = normalizePort(env.PORT);
app.set('port', port);

//TODO Remove
app.use((req,res,next) => {
    console.log(req.body);
    next();
});


const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(value) {
    let port = parseInt(value, 10);
    if(isNaN(port)) {
        return value;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    let bind =  typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch(error.code) {
        case 'EACCES':
        console.error(bind + " requires elevated priveleges");

        process.exit(1);
        break;

        case 'EADDRINUSE':
        console.error(bind + " is already in use");
        process.exit(1);
        break;
        default:
        throw error;
    }
}

function onListening(){
    let addr = server.address();
    let bind = typeof addr === 'String' 
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log("listening on " + bind);
}