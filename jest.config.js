module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  // Mongodb-memory-server: https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners :
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/setupFile.ts'],
};
