import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const config = {
    coverageProvider: 'v8',
    testEnvironment: 'node',
    moduleNameMapper: {
        // Point `@/` to the `src` folder
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

export default createJestConfig(config);