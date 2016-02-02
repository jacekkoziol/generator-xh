/**
 * JSCS - checking JavaScript Code Style.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('jscs', {
    src: '<%%= xh.dist %>/js/main.js',
    options : {
      preset: "google",
      fileExtensions: [".js", "jscs"],

      requireSemicolons: true,
      requireParenthesesAroundIIFE: true,
      maximumLineLength: 120,
      validateLineBreaks: "LF",
      validateIndentation: 2,
      disallowTrailingComma: true,
      disallowUnusedParams: true,

      disallowSpacesInsideObjectBrackets: null,
      disallowImplicitTypeConversion: ["string"],

      safeContextKeyword: "_this",

      jsDoc: {
          checkAnnotations: "closurecompiler",
          checkParamNames: true,
          requireParamTypes: true,
          checkRedundantParams: true,
          checkReturnTypes: true,
          checkRedundantReturns: true,
          requireReturnTypes: true,
          checkTypes: "capitalizedNativeCase",
          checkRedundantAccess: true,
          requireNewlineAfterDescription: true
      },

      excludeFiles: [
          "test/data/**",
          "patterns/*"
      ]
    }
  });
};
