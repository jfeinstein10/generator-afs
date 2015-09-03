'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  prompting: function() {
    var done = this.async();
    this.prompt({
        type: 'input',
        name: 'migrationName',
        message: 'Please describe your migration:'
      }, function(answers) {
        this.migrationName = answers.migrationName.toLowerCase().replace(' ', '_');
        done();
    }.bind(this));
  },

  writing: function () {
    var repositoryPath = this.destinationPath('migrate');
    this.spawnCommand('migrate', ['script', this.migrationName, repositoryPath])
  }

});
