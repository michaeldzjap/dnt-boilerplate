import { Application } from 'express';

import NunjucksDriver from '../../../src/lib/templating/NunjucksDriver';
import TemplatingManager from '../../../src/lib/templating/TemplatingManager';

const expressMock = ({} as any) as Application;

describe('support:TemplatingManager', (): void => {
    it('resolves the Nunjucks driver', (): void => {
        const nunjucks = new TemplatingManager(expressMock).driver('nunjucks');

        expect(nunjucks).toBeInstanceOf(NunjucksDriver);
    });
});
