'use strict';

module.exports = function(generator) {

  generator.writing.backend = function() {
    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath('__init__.py')
    );
    this.fs.copy(
      this.templatePath('app.py'),
      this.destinationPath('app.py')
    );
    this.fs.copy(
      this.templatePath('main.py'),
      this.destinationPath('main.py')
    );
    this.fs.copy(
      this.templatePath('environment.py'),
      this.destinationPath('environment.py')
    );

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath('models/__init__.py')
    );
    this.fs.copy(
      this.templatePath('models.py'),
      this.destinationPath('models/models.py')
    );

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath('scripts/__init__.py')
    );

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

