module.exports = {
  
  testEnvironment: 'node',
   setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/tests/**/*.test.js'], // or 'tests/**/*.test.js'
  moduleFileExtensions: ['js', 'json'],
  coverageDirectory: 'coverage',
  verbose: true,
};
