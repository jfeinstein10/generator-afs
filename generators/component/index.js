'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils');

module.exports = yeoman.generators.Base.extend(utils.getGeneratorBase({
  prompting: function() {
    var done = this.async();
    this._optionOrPrompt([{
      name: 'componentType',
      type: 'list',
      choices: ['controller', 'directive', 'service'],
      message: 'What type of component would you like to create?'
    }, {
      name: 'componentName',
      type: 'input',
      message: function(answers) {
        return 'What would you like to name the ' + answers.componentType + '?';
      }
    }, {
      name: 'hasRoute',
      type: 'confirm',
      message: 'Would you like to create a new route for this controller?',
      default: false,
      when: function(answers) {
        return answers.componentType === 'controller';
      }
    }, {
      name: 'route',
      type: 'input',
      message: 'What would you like that route to be?',
      when: function(answers) {
        return answers.hasRoute;
      }
    }, {
      name: 'pageName',
      type: 'input',
      message: function(answers) {
        return 'What page does the ' + answers.componentType + ' belong to?';
      }
    }], function(answers) {
      this.props = answers;
      this.props.angularAppName = this.config.get('angularAppName');
      this.props.componentName = this._s.camelize(this.props.componentName);
      done();
    }.bind(this));
  },

  writing: function() {
    // Create the page if it doesn't exist
    var exists = this._nativeFs.existsSync(this.destinationPath('static/app/' + this.props.pageName));
    if (!exists) {
      this.composeWith('angular-flask:page', {options: {
        pageName: this.props.pageName
      }});
    }

    var path = 'static/app/' + this.props.pageName + '/' + this.props.componentType + 's/';
    switch (this.props.componentType) {
      case 'controller':
        this.props.controllerName = this._s.capitalize(this.props.componentName) + 'Ctrl';
        this.fs.copyTpl(
          this.templatePath('_controller.js'),
          this.destinationPath(path + this.props.controllerName + '.js'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('spec/_controller.js'),
          this.destinationPath(path + this.props.controllerName + '.spec.js'),
          this.props
        );
        if (this.props.hasRoute) {
          var partialPath = this.destinationPath('static/partials/' + this.props.componentName + '.html');
          if (!this.fs.exists(partialPath)) {
            this.fs.copyTpl(
              this.templatePath('_controller.html'),
              partialPath,
              this.props
            );
          }
          this._rewriteFile(
            this.destinationPath('static/app/app.js'),
            '/* angular-flask route needle */',
            this.templatePath('_route.js'),
            this.props
          );
        }
        break;
      case 'directive':
        this.props.directiveName = this.props.componentName;
        this.props.directiveTag = this._s.dasherize(this.props.directiveName);
        this.fs.copyTpl(
          this.templatePath('_directive.js'),
          this.destinationPath(path + this.props.directiveName + '.js'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('spec/_directive.js'),
          this.destinationPath(path + this.props.directiveName + '.spec.js'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('_directive.html'),
          this.destinationPath(path + this.props.directiveName + '.html'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('_directive.css'),
          this.destinationPath(path + this.props.directiveName + '.css'),
          this.props
        );
        break;
      case 'service':
        this.props.serviceName = this._s.capitalize(this.props.componentName.toUpperCase()) + 'Service';
        this.fs.copyTpl(
          this.templatePath('_service.js'),
          this.destinationPath(path + this.props.serviceName + '.js'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('spec/_service.js'),
          this.destinationPath(path + this.props.serviceName + '.spec.js'),
          this.props
        );
        break;
    }
    
  }
}));
