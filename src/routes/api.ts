import { Router, Request, Response } from 'express';

export default (router: Router): void => {
    router.get('/', (request: Request, response: Response): void => {
        response.setHeader('Content-Type', 'application/json');
        response.send('Hey now!');
    });
};
