'use strict';

module.exports = function(generator) {

  generator.writing.backend = function() {
    this.fs.copyTpl(
      this.templatePath('_requirements.txt'),
      this.destinationPath('requirements.txt'),
      this
    );

    this.fs.write(this.destinationPath('__init__.py'), '');
    this.fs.copyTpl(
      this.templatePath('_app.py'),
      this.destinationPath('app.py'),
      this
    );
    this.fs.copy(
      this.templatePath('serve.py'),
      this.destinationPath('serve.py')
    );
    this.fs.copy(
      this.templatePath('environment.py'),
      this.destinationPath('environment.py')
    );

    this.fs.write(this.destinationPath('models/__init__.py'), '');
    this.fs.copy(
      this.templatePath('models.py'),
      this.destinationPath('models/models.py')
    );

    this.fs.write(this.destinationPath('scripts/__init__.py'), '');

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath('controllers/__init__.py')
    );
    this.fs.copy(
      this.templatePath('authentication.py'),
      this.destinationPath('controllers/authentication.py')
    );
  };

};

