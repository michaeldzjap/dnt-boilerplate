import { Application } from 'express';
import consolidate from 'consolidate';
import nunjucks from 'nunjucks';

import Engine from '../../types/support/templating/Engine';
import Templating from '../../types/support/templating/Templating';
import { viewPath } from '../helpers';
import { NAME } from '../../config/app';
import { ENGINES } from '../../config/templating';

/**
 * @class
 * @classdesc A Nunjuck specific templating engine driver.
 */
class NunjucksDriver implements Templating {
    /**
     * The application instance.
     *
     * @var {Application}
     */
    protected application: Application;

    protected config: Engine;

    /**
     * Create a new Nunjucks driver instance.
     *
     * @constructor
     * @param {Application} application
     */
    public constructor(application: Application) {
        this.application = application;
        this.config = ENGINES.NUNJUCKS;
    }

    /**
     * Configure the Nunjucks engine.
     *
     * @return {void}
     */
    public configure(): void {
        consolidate.requires.nunjucks = nunjucks.configure(viewPath(), {
            autoescape: true,
            express: this.application,
        });

        consolidate.requires.nunjucks.addFilter('title', (title: string): string => {
            return `${NAME} | ${title}`;
        });

        // Assign the Nunjucks engine to .njk files
        this.application.engine(this.config.EXTENSION, consolidate.nunjucks);

        // Set .njk as the default extension
        this.application.set('view engine', this.config.EXTENSION);
        this.application.set('views', viewPath());
    }
}

export default NunjucksDriver;
