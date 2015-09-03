'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var AFSBase = {
  prompting: {
    base: function() {
      var done = this.async();
      this.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'What\'s the name of your project?',
            default: 'project'
        }], function(answers) {
          this.props = answers;
          done();
      }.bind(this));
    }
  },
  writing: {},
  install: {
    all: function() {
      this.bowerInstall();
    }
  }
};

require('./setup-config')(AFSBase);
require('./setup-backend')(AFSBase);
require('./setup-database')(AFSBase);
require('./setup-frontend')(AFSBase);

module.exports = yeoman.generators.Base.extend(AFSBase);
