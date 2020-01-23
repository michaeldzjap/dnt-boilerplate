import express, { Request, Response } from 'express';
import consolidate from 'consolidate';
import nunjucks from 'nunjucks';

import config from './config/app';
import { viewPath } from './support/helpers';
import { HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from './constants/http';

const app = express();

consolidate.requires.nunjucks = nunjucks.configure(viewPath(), {
    autoescape: true,
    express: app,
});

consolidate.requires.nunjucks.addFilter('title', (title: string): string => {
    return `${config.NAME} | ${title}`;
});

// Assign the Handlebars engine to .hbs files
app.engine('njk', consolidate.nunjucks);

// Set .hbs as the default extension
app.set('view engine', 'njk');
app.set('views', viewPath());

app.get('/', (request: Request, response: Response): void => {
    response.status(HTTP_OK);
    response.render('welcome', { title: config.NAME });
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
