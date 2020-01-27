import express from 'express';
import { Environment } from 'nunjucks';
import consolidate from 'consolidate';

import NunjucksDriver from '../../../src/lib/templating/NunjucksDriver';

describe('support:NunjucksDriver', (): void => {
    it('configures the Nunjucks driver correctly', (): void => {
        const nunjucks = new NunjucksDriver(express());

        expect(consolidate.requires.nunjucks).toBeUndefined();

        nunjucks.configure();

        expect(consolidate.requires.nunjucks).toBeInstanceOf(Environment);
        expect(consolidate.requires.nunjucks.getFilter('title')).toBeDefined();
        expect(consolidate.requires.nunjucks.getFilter('title')('foo')).toContain('foo');
    });
});
