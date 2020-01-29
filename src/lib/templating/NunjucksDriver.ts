import { Application } from 'express';
import consolidate from 'consolidate';
import nunjucks from 'nunjucks';

import Config from '../../types/lib/config/templating/Engine';
import TemplatingEngine from '../../types/lib/templating/TemplatingEngine';
import { viewPath } from '../support/helpers';
import { NAME } from '../../config/app';
import { NUNJUCKS } from '../../config/templating';

/**
 * @class
 * @classdesc A Nunjuck specific templating engine driver.
 */
class NunjucksDriver implements TemplatingEngine {
    /**
     * The application instance.
     *
     * @var {Application}
     */
    protected application: Application;

    /**
     * The Nunjucks specific templating eninge config.
     *
     * @var {Config}
     */
    protected config: Config;

    /**
     * Create a new Nunjucks driver instance.
     *
     * @constructor
     * @param {Application} application
     */
    public constructor(application: Application) {
        this.application = application;
        this.config = NUNJUCKS;
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
