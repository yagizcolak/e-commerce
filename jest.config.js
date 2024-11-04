module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Mock CSS modules
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // Mock image imports
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};