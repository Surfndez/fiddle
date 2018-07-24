module.exports = (wallaby) => ({
  files: [
    'src/**/*.js?(x)',
    'src/**/*.ts?(x)',
    'src/**/*.html',
    'tests/**/*.snap',
    { pattern: 'tests/**/*-spec.ts?(x)', ignore: true },
    { pattern: 'tests/**/!(*-spec)', instrument: false, load: true },
    { pattern: 'package.json', instrument: false, load: true }
  ],

  tests: [
    'tests/**/*-spec.ts?(x)'
  ],

  env: {
    type: 'node',
    runner: 'node',
    params: { env: 'wallaby=true' }
  },

  testFramework: 'jest',

  // Enable mock hoisting as same as ts-jest does
  // (https://github.com/kulshekhar/ts-jest#supports-automatic-of-jestmock-calls)
  preprocessors: {
    '**/*.js?(x)': (file) => require('babel-core').transform(
      file.content,
      { sourceMaps: true, filename: file.path, presets: ['babel-preset-jest'] })
  },

  workers: {
    initial: 2,
    regular: 1
  },

  setup: (w) => {
    const path = require('path');

    const jestConfig = {
      resetMocks: true,
      resetModules: true,
      setupTestFrameworkScriptFile: path.join(wallaby.projectCacheDir, 'tests/setup.js'),
      globals: { __JEST_DEV__: true }
    };

    w.testFramework.configure(jestConfig);
  }
});
