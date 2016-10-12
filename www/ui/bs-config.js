
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

module.exports = {
  "files": [
    './src/**/*.css',
    './src/**/*.js',
    './src/**/*.json',
    './src/**/*.html',
    './src/**/*.jpg',
    './src/**/*.png',
    './src/**/*.gif'
  ],
  "server": {
    baseDir: './src',
    //directory: true,
    routes: {
      '/bower_components': 'bower_components',
    },
  },
  "port": 3000,
  "open": "local"
};