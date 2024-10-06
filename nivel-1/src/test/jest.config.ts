import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
   	preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    setupFilesAfterEnv: ['./client.ts'],
    clearMocks: true,
};

export default config;