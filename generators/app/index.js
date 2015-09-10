'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils');

var AFSBase = utils.getGeneratorBase({
  prompting: {
    base: function() {
      var done = this.async();
      this.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'What would you like to name your project?',
            default: 'project'
        }], function(answers) {
          this.props = answers;
          this.config.set('projectName', this.props.projectName);
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
});

require('./setup-config')(AFSBase);
require('./setup-backend')(AFSBase);
require('./setup-frontend')(AFSBase);

module.exports = yeoman.generators.Base.extend(AFSBase);
