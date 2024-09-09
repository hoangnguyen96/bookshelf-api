/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/loading.tsx",
    "!<rootDir>/src/**/layout.tsx",
    "!<rootDir>/src/**/error.tsx",
    "!<rootDir>/src/**/not-found.tsx",
    "!<rootDir>/src/**/global-error.tsx",
    "!<rootDir>/src/app/ChakraProvider/index.tsx",
    "!<rootDir>/src/app/SessionWrapper/index.tsx",
    "!<rootDir>/src/app/api/auth/**/*",
    "!<rootDir>/src/assets/**/*",
    "!<rootDir>/src/constants/**/*",
    "!<rootDir>/src/api/**/*",
    "!<rootDir>/src/actions/**/*",
    "!<rootDir>/src/models/**/*",
    "!<rootDir>/src/services/**/*",
    "!<rootDir>/src/styles/**/*",
    "!<rootDir>/src/themes/**/*",
    "!<rootDir>/src/types/**/*",
    "!<rootDir>/src/utils/**/*",
    "!<rootDir>/src/auth.config.ts",
    "!<rootDir>/src/auth.ts",
    "!<rootDir>/src/middleware.ts",
    "!<rootDir>/node_modules/",
  ],
  moduleNameMapper: {
    "^@app/components/(.*)$": "<rootDir>/components/$1",
    "^@app/api$": "<rootDir>/src/api",
    "^@app/actions/auth$": "<rootDir>/src/actions/auth.ts",
    "@app/auth": "<rootDir>/__test__/mocks/auth.ts",
    "next-auth/providers/credentials":
      "<rootDir>/__test__/mocks/next-auth-providers-credentials.ts",
    "next-auth": "<rootDir>/__test__/mocks/next-auth.ts",
  },
  transformIgnorePatterns: ["/node_modules/(?!next-auth|@auth/core)/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
