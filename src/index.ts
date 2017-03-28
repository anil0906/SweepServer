import * as http from 'http';
import * as debug from 'debug';
import { connect } from './db/DBConnection';
import App from './App';
import { server as webSocketServer} from 'websocket';
debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const httpServer = http.createServer(App);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
// Initiate DB connection on server startup
connect();
function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    let addr = httpServer.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
