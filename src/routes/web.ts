import { Application } from 'express';

import { index } from '../controllers/welcome';

export default (application: Application): void => {
    application.get('/', index);
};
