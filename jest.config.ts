import nextJest from 'next/jest.js';

import dotenv from 'dotenv';
import type { Config } from 'jest';

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});
dotenv.config({ path: '.env.local' });
// Add any custom config to be passed to Jest
const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	coverageProvider: 'v8',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1', // This line maps your TypeScript alias to Jest
	},
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
