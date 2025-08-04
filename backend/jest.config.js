module.exports = {
  roots: ["<rootDir>/src/"],
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2017',
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: 'es6',
          noInterop: false,
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@main/(.*)$": "<rootDir>/src/main/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },
};
