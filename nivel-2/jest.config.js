/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest', 
  },
  testMatch: ['**/tests/**/*.test.ts'], // Asegúrate de que Jest busque archivos de prueba en la carpeta correcta
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};