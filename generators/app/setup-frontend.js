'use strict';
var fs = require('fs');
var utils = require('../utils')

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
        this.frontendProps.angularAppName = utils.toCamelCase(this.props.projectName) + 'App';
        this.config.set('angularAppName', this.frontendProps.angularAppName);
        var angularModules = [
          "'ui.router'"
        ];
        switch (answers.cssFramework) {
          case 'Bootstrap':
            this.frontendProps.homeHtmlPath = this.templatePath('_home.bootstrap.html');
            angularModules = angularModules.concat([
              "'ui.bootstrap'"
            ]);
            break;
          case 'Foundation':
            this.frontendProps.homeHtmlPath = this.templatePath('_home.foundation.html');
            angularModules = angularModules.concat([
              "'mm.foundation'"
            ]);
            break;
          case 'Angular Material':
            this.frontendProps.homeHtmlPath = this.templatePath('_home.material.html');
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
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('templates/index.html'),
      this.frontendProps
    );
    this.fs.copyTpl(
      this.templatePath('_app.js'),
      this.destinationPath('static/app/app.js'),
      this.frontendProps
    );
    fs.mkdirSync(this.destinationPath('static'));
    fs.mkdirSync(this.destinationPath('static/app'));
    fs.mkdirSync(this.destinationPath('static/images'));
    fs.mkdirSync(this.destinationPath('static/styles'));
    fs.mkdirSync(this.destinationPath('static/partials'));
    this.composeWith('angular-flask:page', {options: {
      pageName: 'common'
    }});
    this.composeWith('angular-flask:page', {options: {
      pageName: 'home'
    }});
    this.composeWith('angular-flask:component', {options: {
      componentType: 'controller',
      componentName: 'home',
      pageName: 'home',
      hasRoute: true,
      route: '/'
    }});
    // Override the default view
    if (this.frontendProps.homeHtmlPath) {
      this.fs.copy(
        this.frontendProps.homeHtmlPath,
        this.destinationPath('static/partials/home.html')
      );
    }

    // Requirements & package files
    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      this.frontendProps
    );
    this.fs.copyTpl(
      this.templatePath('_bundles.yaml'),
      this.destinationPath('static/bundles.yaml'),
      this.frontendProps
    );
  };

};

