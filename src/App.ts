import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Controllers from './controller';
import InterceptorController from './controller/AuthenticationInterceptionController';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());

    }

    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();
        /* Secure end points for autenticated Session*/
        router.all('/secure/:anyRoute', (req, res, next) => {
            InterceptorController(req, res, next);
        });
        router.post('/secure/createGame', (req, res) => {
            Controllers.createGameController(req.body, res);
        });
        /* Public end points for unauthenticated operation */
        router.post('/public/createPlayer', (req, res) => {
            Controllers.createPlayerController(req.body, res);
        });
        router.post('/public/authenticate', (req, res) => {
            Controllers.authenticatePlayerController(req.body, res);
        });
        // For dev work, in future these routes will be imported based on node env === dev
        router.get('/index.html', (req, res, next) => {
            res.status(200).sendFile('index.html', { root: './' });
        });
        router.get('/dev/:pathname', (req, res, next) => {
            console.log('req.params.pathname', req.params.pathname);
            res.status(200).sendFile(req.params.pathname, { root: './' });
        });
        // router.post('/', (req, res, next) => {
        //     controller(req, res);
        //     //res.json(JSON.stringify(resp));
        // });
        // For dev work, in future these routes will be imported based on node env === dev
        this.express.use('/', express.static('./'));
        this.express.use('/', router);

    }

}

export default new App().express;
