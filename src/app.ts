/**
 * Required External Modules
 */
import express from 'express'
import logger from 'morgan';
import helmet from 'helmet';
import indexRouter from './routes/index.router';
import cors from 'cors';

/**
 * App Variables
 */
const app = express();
const path = '/';
const actuator = require('express-actuator');

/**
 *  App Configuration
 */
app.use(logger('dev'));
app.use(actuator({
    basePath: `${path}/management` // [info, metrics, health]
}));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));


// Index Router to call controllers
app.use(path, indexRouter);

app.use((req, res) => {
    return res.status(404).send({message: `Route '${req.url}' Not found.`});
});

export default app;
