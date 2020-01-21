module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests/feature', '<rootDir>/tests/unit'],
    modulePaths: ['<rootDir>/src/'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    collectCoverage: true,
};
