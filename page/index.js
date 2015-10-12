'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');

var PageGenerator = yeoman.generators.Base.extend({

  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    try {
      this.configuration = this.config.get('config');
    } catch (ex) {
      this.log('You need to run this generator in a project directory.');
      process.exit();
    }

    this.argument('newPages', {
      desc: 'List of names',
      type: Array,
      required: false
    });

    this.pages = this.config.get('pages');
    this.pages = _.union(this.newPages, this.pages);

    if (_.isEmpty(this.pages)) {
      this.log('Page names list cannot be empty.');
      process.exit();
    }

    this.config.set('pages', this.pages);

    this.option('skip-build', {
      desc: 'Do not run `grunt build` after pages are created',
      type: Boolean,
      defaults: false
    });
  },

  initializing: function () {
    this.reserved = ['template', 'wp'];

    this.isNotReserved = function(page) {
      if (this.reserved.indexOf(_.kebabCase(page)) === -1) {
        return page;
      }
    };

    if (!this.pages.every(this.isNotReserved, this)) {
      this.log('You cannot use those reserved words as a page name: ' + this.reserved.join(', ') + '.');
      process.exit();
    }
  },

  writing: function () {
    // Create pages from template
    this.generatePage = function(page) {
      var filename = _.kebabCase(page) + '.' + this.configuration.extension;
      var root = path.join(this.destinationRoot(), 'src');

      // Write file if not exists
      if (!this.fs.exists(path.join(root, filename))) {
        this.fs.copyTpl(path.join(root, 'template.' + this.configuration.extension), path.join(root, filename), {
          extension: this.configuration.extension,
          name: page
        });
      }
    };

    // Update index template
    this.updateIndex = function(array) {
      this.indexFile = this.readFileAsString('index.html');
      this.link = '';

      array.forEach(function(page) {
        this.filename = _.kebabCase(page) + '.' + this.configuration.extension;
        this.link += '<li><i class="fa fa-file-o"></i><a href="dist/' + this.filename + '"><strong>' +
          page + '</strong> ' + this.filename + '</a><i class="fa fa-check"></i></li>\n';
      }, this);

      // Write file
      this.write('index.html', this.indexFile.replace(/(<!-- @@pages -->)((.|\n)*)(<!-- \/@@pages -->)/img, '$1' + this.link + '$4'));
    };

    this.pages.forEach(this.generatePage, this);
    this.updateIndex(this.pages);
  },

  end: function () {
    if (!this.options['skip-build']) {
      this.spawnCommand('grunt', ['build']);
      this.log('All done!');
    }
  }

});

module.exports = PageGenerator;
