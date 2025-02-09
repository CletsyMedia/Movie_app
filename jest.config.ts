export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFiles: ["<rootDir>/jest.setup.ts"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
  };
