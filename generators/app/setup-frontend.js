'use strict';

module.exports = function(generator) {

  generator.prompting.frontend = function() {
    var done = this.async();
    this.prompt([{
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
        this.frontendProps = answers;
        this.frontendProps.projectName = this.props.projectName;
        this.frontendProps.angularAppName = this._s.camelize(this.props.projectName) + 'App';
        this.config.set('angularAppName', this.frontendProps.angularAppName);
        var angularModules = [
          "'ui.router'"
        ];
        switch (answers.cssFramework) {
          case 'Bootstrap':
            this.frontendProps.homeHtmlPath = '_home.bootstrap.html';
            angularModules = angularModules.concat([
              "'ui.bootstrap'"
            ]);
            break;
          case 'Foundation':
            this.frontendProps.homeHtmlPath = '_home.foundation.html';
            angularModules = angularModules.concat([
              "'mm.foundation'"
            ]);
            break;
          case 'Angular Material':
            this.frontendProps.homeHtmlPath = '_home.material.html';
            angularModules = angularModules.concat([
              "'ngMaterial'"
            ]);
            break;
        }
        this.frontendProps.angularModules = angularModules;
        done();
    }.bind(this));
  };

  generator.writing.frontend = function() {
    this._copyTpl('_index.html', 'templates/index.html', this.frontendProps);
    this._copyTpl('_app.js', 'static/app/app.js', this.frontendProps);
    this._nativeFs.mkdirSync(this.destinationPath('static'));
    this._nativeFs.mkdirSync(this.destinationPath('static/app'));
    this._nativeFs.mkdirSync(this.destinationPath('static/images'));
    this._nativeFs.mkdirSync(this.destinationPath('static/styles'));
    this._nativeFs.mkdirSync(this.destinationPath('static/partials'));
    this.composeWith('afs:page', {options: {
      pageName: 'common'
    }});
    this.composeWith('afs:page', {options: {
      pageName: 'home'
    }});
    this.composeWith('afs:component', {options: {
      componentType: 'controller',
      componentName: 'home',
      pageName: 'home',
      hasRoute: true,
      route: '/'
    }});
    // Override the default view
    if (this.frontendProps.homeHtmlPath) {
      this._copy(this.frontendProps.homeHtmlPath, 'static/partials/home.html');
    }

    // Requirements & package files
    this._copy('bowerrc','.bowerrc');
    this._copyTpl('_bower.json', 'bower.json', this.frontendProps);
    this._copyTpl('_bundles.yaml', 'static/bundles.yaml', this.frontendProps);
  };

};

