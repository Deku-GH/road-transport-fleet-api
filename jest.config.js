export default {
  testEnvironment: "node",

  setupFiles: ["<rootDir>/tests/setup.ts"],

  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript"
          },
          target: "es2022"
        },
        module: {
          type: "es6"
        }
      }
    ]
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};