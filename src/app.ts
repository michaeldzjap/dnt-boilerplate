import express, { Request, Response } from 'express';

import config from './config/app';
import { HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from './constants/http';

const app = express();

app.get('/', (request: Request, response: Response): void => {
    response.type('text/plain');
    response.status(HTTP_OK);
    response.send('Hey now!');
});

app.use((request: Request, response: Response): void => {
    response.type('text/plain');
    response.status(HTTP_NOT_FOUND);
    response.send('Not Found');
});

app.use((error: Error, request: Request, response: Response): void => {
    console.error(error.stack);

    response.type('text/plain');
    response.status(HTTP_INTERNAL_SERVER_ERROR);
    response.send('Internal Server Error');
});

app.listen(config.HTTP_PORT, (): void => console.log(`App listening on port ${config.HTTP_PORT}`));
