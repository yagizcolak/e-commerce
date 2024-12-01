module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Explicitly specify the environment
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest", // Add this line
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jose)/)", // Transform jose module
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|svg)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Include all TypeScript/TSX files
    "!src/**/*.d.ts", // Exclude type definition files
    "!src/index.tsx", // Exclude main entry point
    "!src/reportWebVitals.ts", // Exclude reportWebVitals
    "!src/setupTests.ts", // Exclude setupTests
    "!src/config.ts", // Exclude configuration files
    "!src/types/**/*", // Exclude type definitions
    "!src/assets/**/*", // Exclude assets directory
    "!src/data/**/*", // Exclude static data
    "!src/context/**/*", // Exclude all context files
    "!src/styles/**/*", // Exclude stylesheets and theme files
    "!src/api/mockApi.ts", // Exclude mock API file
    "!src/utils/errorUtils.ts", // Exclude specific utility file
    "!src/components/**/*.test.{ts,tsx}", // Exclude test files in components
    "!src/features/**/*/index.ts", // Exclude index.ts files in features
    "!src/components/**/index.ts", // Exclude index.ts files in components
    "!src/App.tsx", // Exclude App.tsx
    "!src/api/axiosInstance.ts", // Exclude axiosInstance.ts
    "!src/features/auth/context/AuthProvider.tsx", // Exclude AuthProvider.tsx
    "!src/features/auth/hooks/*.ts", // Exclude all auth hooks
    "!src/features/comments/hooks/*.ts", // Exclude all comment hooks
    "!src/features/products/hooks/*.ts", // Exclude all product hooks
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
};
