/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./jest.global-setup.js",
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
