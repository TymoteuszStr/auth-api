/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: ['**/tests/**/*.test.ts'],

  setupFilesAfterEnv: ['./src/tests/setup.ts'],

  moduleFileExtensions: ['ts', 'js', 'json'],

  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },

  verbose: true,
};
