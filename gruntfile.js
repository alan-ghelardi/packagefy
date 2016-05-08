'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    jshint : {
      all : {
        src : [ 'gruntfile.js', 'src/**/*.js', 'test/**/*.js' ],
        options : {
          jshintrc : true
        }
      }
    },

    mochaTest : {
      test : {
        src : 'test/*-test.js',
        options : {
          reporter : 'spec'
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
};
