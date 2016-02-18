/**
 * JSCS - checking JavaScript Code Style.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('jscs', {
    src: '<%%= xh.dist %>/js/main.js',
    options : {
      config: '.jscsrc'
    }
  });
};
