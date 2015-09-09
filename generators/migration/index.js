'use strict';
var os = require('os');
var yeoman = require('yeoman-generator');
var shell = require('shelljs');
var utils = require('../utils');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'migrationName',
        message: 'Please describe your migration:'
      }, function(answers) {
        this.migrationName = utils.underscorize(utils.toCamelCase(answers.migrationName.toLowerCase()));
        done();
    }.bind(this));
  },

  writing: function () {
    var virtualenvPath = this.destinationPath('venv');
    shell.exec('virtualenv ' + virtualenvPath);
    if (os.platform() === 'win32') {
      shell.exec(virtualenvPath + '/Scripts/activate');
    } else {
      shell.exec('source ' + virtualenvPath + '/bin/activate');
    }
    shell.exec('migrate script ' + this.migrationName + ' ' + this.destinationPath('migrate'));
  }
});
