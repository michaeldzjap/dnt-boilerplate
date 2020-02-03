import { Router, Request, Response } from 'express';
import { urlencoded } from 'body-parser';

import * as welcome from '../controllers/welcome';
import * as register from '../controllers/register';

export default (router: Router): void => {
    router.get('/', welcome.index);

    router.get('/register', register.index);
    router.post('/register', urlencoded({ extended: true }), ...register.store);

    router.get('/test', (request: Request, response: Response): void => {
        console.log(request.path, request.session!.previousUrl);
        response.send();
    });
};
