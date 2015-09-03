'use strict';

module.exports = function(generator) {

  generator.install.database = function() {
    var repositoryPath = this.destinationPath('migrate');
    var managePath = this.destinationPath('migrate/manage.py');
    this.spawnCommand('migrate', ['create', repositoryPath, this.props.projectName]);
  };

};

