'use strict';

module.exports = function(generator) {

  generator.prompting.backend = function() {
    var done = this.async();
    this.prompt([{
      type: 'input',
      name: 'secret',
      message: 'Please supply a secret key for the app'
    }, {
      type: 'input',
      name: 'dbUrl',
      message: 'What database URL would you like the server to connect to?',
      default: 'sqlite://'
    }], function(answers) {
      this.backendProps = answers;
      this.backendProps.projectName = this.props.projectName;
      done();
    }.bind(this));
  };

  generator.writing.backend = function() {
    this._copy('_requirements.txt', 'requirements.txt');

    this.fs.write(this.destinationPath('__init__.py'), '');
    this._copy('serve.py', 'serve.py');
    this._copy('manage.py', 'manage.py');
    this._copy('app.py', 'app.py');
    this._copy('environment.py', 'environment.py');
    this._copyTpl('_config.py', 'config.py', this.backendProps);
    this._copyTpl('_settings.cfg', 'settings.cfg', this.backendProps);

    this.fs.write(this.destinationPath('models/__init__.py'), '');
    this._copy('models.py', 'models/models.py');

    this.fs.write(this.destinationPath('scripts/__init__.py'), '');

    this._copy('__init__.py', 'controllers/__init__.py');
    this._copy('authentication.py', 'controllers/authentication.py');
  };

};

