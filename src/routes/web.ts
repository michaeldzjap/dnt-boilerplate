import { Router } from 'express';

import { index } from '../controllers/welcome';

export default (router: Router): void => {
    router.get('/', index);
};
