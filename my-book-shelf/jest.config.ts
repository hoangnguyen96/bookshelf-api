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
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/**/not-found.tsx",
    "!<rootDir>/src/**/global-error.tsx",
    "!<rootDir>/src/app/robots.ts",
    "!<rootDir>/src/app/sitemap.ts",
    "!<rootDir>/src/**/actions/**/*",
    "!<rootDir>/src/assets/**/*",
    "!<rootDir>/src/constants/**/*",
    "!<rootDir>/src/app/api/auth/**/*",
    "!<rootDir>/src/actions/**/*",
    "!<rootDir>/src/interface/**/*",
    "!<rootDir>/src/layouts/**/*",
    "!<rootDir>/src/services/**/*",
    "!<rootDir>/src/styles/**/*",
    "!<rootDir>/src/themes/**/*",
    "!<rootDir>/src/types/**/*",
    "!<rootDir>/src/utils/**/*",
    "!<rootDir>/src/mocks/**/*",
    "!<rootDir>/src/auth.config.ts",
    "!<rootDir>/src/auth.ts",
    "!<rootDir>/src/middleware.ts",
    "!<rootDir>/node_modules/",
  ],
  moduleNameMapper: {
    "^@app/components/(.*)$": "<rootDir>/components/$1",
    "^@app/features/dashboard/actions$":
      "<rootDir>/src/features/dashboard/actions/$1",
    "^@app/utils$": "<rootDir>/src/utils",
    "^@app/actions/auth$": "<rootDir>/src/features/auth/actions/$1",
    "@app/auth": "<rootDir>/authConfig/mocks/auth.ts",
    "next-auth/providers/credentials":
      "<rootDir>/authConfig/mocks/next-auth-providers-credentials.ts",
    "next-auth": "<rootDir>/authConfig/mocks/next-auth.ts",
  },
  transformIgnorePatterns: ["/node_modules/(?!next-auth|@auth/core)/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
