import { Config } from "@jest/types"

const config: Config.InitialOptions = {
   	preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    setupFilesAfterEnv: ['./client.ts'],
    clearMocks: true,
    setupFiles: ['./jest.setup.ts'],
    testMatch: ['**/test/**/*.test.ts'],
};

export default config;