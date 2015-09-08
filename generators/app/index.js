'use strict';
var fs = require('fs');
var ejs = require('ejs');
var yeoman = require('yeoman-generator');
var utils = require('../utils')

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
  writing: {
    all: function() {
      this.fs.copyTpl(
        this.templatePath('_setup.sh'),
        this.destinationPath('setup.sh'),
        this.props
      );
    }
  },
  install: {
    all: function() {
      var done = this.async();
      this.fs.commit([], function() {
        fs.chmodSync(this.destinationPath('setup.sh'), '755');
        this.spawnCommand('./setup.sh', [], {
          cwd: this.destinationPath('')
        });  
      }.bind(this));
    }
  }
};

require('./setup-config')(AFSBase);
require('./setup-backend')(AFSBase);
require('./setup-frontend')(AFSBase);

module.exports = yeoman.generators.Base.extend(AFSBase);

