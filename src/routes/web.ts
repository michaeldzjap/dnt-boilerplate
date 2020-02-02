import { Router, Request, Response } from 'express';
import { urlencoded } from 'body-parser';

import * as welcome from '../controllers/welcome';
import * as register from '../controllers/register';
import validate from '../middleware/validateNewUser';

export default (router: Router): void => {
    router.get('/', welcome.index);

    router.get('/register', register.index);
    router.post('/register', urlencoded({ extended: true }), validate, register.store);

    router.get('/test', (request: Request, response: Response): void => {
        console.log(request.path, request.session!.previousUrl);
        response.send();
    });
};
