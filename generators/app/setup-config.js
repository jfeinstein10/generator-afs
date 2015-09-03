'use strict';

module.exports = function(generator) {

  console.log(generator);
  generator.writing.config = function() {
    // RC files
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );
    // Requirements & package files
    this.fs.copy(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json')
    );
    this.fs.copy(
      this.templatePath('_bundles.yaml'),
      this.destinationPath('static/bundles.yaml')
    );
    this.fs.copy(
      this.templatePath('_requirements.txt'),
      this.destinationPath('requirements.txt')
    );
  };

};

