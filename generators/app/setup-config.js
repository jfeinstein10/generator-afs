'use strict';

module.exports = function(generator) {

  generator.prompting.config = function() {
    var done = this.async();
    this.prompt([{
          type: 'confirm',
          name: 'babel',
          message: 'Would you like to use babel?',
          default: false
        }, {
          type: 'list',
          name: 'styling',
          message: 'Which (if any) CSS pre-processor would you like to use?',
          choices: ['None', 'less', 'scss', 'sass'],
          default: 'None'
        }, {
          type: 'list',
          name: 'cssFramework',
          message: 'Which (if any) CSS Framework would you like to use?',
          choices: ['None', 'Bootstrap', 'Foundation', 'Angular Material'],
          default: 'None'
      }], function(answers) {
        this.configProps = answers;
        done();
    }.bind(this));
  };

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
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      this.configProps
    );
    this.fs.copyTpl(
      this.templatePath('_bundles.yaml'),
      this.destinationPath('static/bundles.yaml'),
      this.configProps
    );
    this.fs.copyTpl(
      this.templatePath('_requirements.txt'),
      this.destinationPath('requirements.txt'),
      this.configProps
    );
  };

};

