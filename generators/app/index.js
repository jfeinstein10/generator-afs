'use strict';
var os = require('os');
var fs = require('fs');
var shell = require('shelljs');
var yeoman = require('yeoman-generator');
var utils = require('../utils');

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
          this.config.set('projectName', this.props.projectName);
          done();
      }.bind(this));
    }
  },
  writing: {},
  install: {
    all: function() {
      var done = this.async();
      this.fs.commit([], function() {
        var virtualenvPath = this.destinationPath('venv');
        shell.exec('bower install');
        shell.exec('virtualenv ' + virtualenvPath);
        if (os.platform() === 'win32') {
          shell.exec(virtualenvPath + '/Scripts/activate');
        } else {
          shell.exec('source ' + virtualenvPath + '/bin/activate');
        }
        shell.exec('pip install -r ' + this.destinationPath('requirements.txt'));
        shell.exec('migrate create ' + this.destinationPath('migrate') + ' ' + this.props.projectName);
        done();
      }.bind(this));
    }
  }
};

require('./setup-config')(AFSBase);
require('./setup-backend')(AFSBase);
require('./setup-frontend')(AFSBase);

module.exports = yeoman.generators.Base.extend(AFSBase);
