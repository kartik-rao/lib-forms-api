// Karma configuration
// Generated on Mon Feb 12 2018 13:30:49 GMT+1100 (AEDT)
var path = require('path');
require('jasmine').DEFAULT_TIMEOUT_INTERVAL = 2000;

module.exports = function (config) {
  config.set({    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-webpack',  'karma-mocha-reporter', 'karma-chrome-launcher', 'karma-sourcemap-loader'],
    // list of files / patterns to load in the browser
    autoWatch: true,
    files: [
        { pattern: "specs/index.ts", watched: true, served: true, included: true }
    ],
    // list of files / patterns to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/index.ts': ['webpack', 'sourcemap']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // Manually add 'coverage-istanbul' for coverage,
    // otherwise we get duplicate console.log output
    reporters: ['mocha'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_LOG,
    client: {
      captureConsole: true
    },
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    browserConsoleLogOptions: {
      level:  "warn"
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true,
      debug: false
    },
    useIframe: false,
    webpack: {
      mode: 'development',
      output: {
        pathinfo: false
      },
      entry: path.join(__dirname, '/specs/index.ts'),
      resolve: {
        modules: [
          'node_modules'
        ],
        extensions: ['.ts', '.tsx', '.js']
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: { loader: 'awesome-typescript-loader',
                options : {
                    useCache: true,
                    transpileOnly: true,
                    declaration: false,
                    reportFiles: [
                        'spects/**/*.{ts,tsx}'
                    ]
                }
              },
              exclude: /node_modules/
            }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  })
}