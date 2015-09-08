'use strict';

module.exports = function(generator) {

  generator.writing.config = function() {
    // Some general config files
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );
  };

};

