'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils');
var fs = require('fs');
var optionOrPrompt = require('yeoman-option-or-prompt');

module.exports = yeoman.generators.Base.extend({
  _optionOrPrompt: optionOrPrompt,
  _rewriteFile: utils.rewriteFile,

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
        return 'What would you like the name of the ' + answers.componentType + ' to be?';
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
      },
      validate: function(answer) {
        return fs.existsSync(this.destinationPath('static/app/' + answer));
      }.bind(this)
    }], function(answers) {
      this.props = answers;
      this.props.angularAppName = this.config.get('angularAppName');
      this.props.componentName = utils.toCamelCase(this.props.componentName);
      done();
    }.bind(this));
  },

  writing: function() {
    var path = 'static/app/' + this.props.pageName + '/' + this.props.componentType + 's/';
    switch (this.props.componentType) {
      case 'controller':
        this.props.controllerName = utils.capitalize(this.props.componentName) + 'Ctrl';
        this.fs.copyTpl(
          this.templatePath('_controller.js'),
          this.destinationPath(path + this.props.controllerName + '.js'),
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
        this.fs.copyTpl(
          this.templatePath('_directive.js'),
          this.destinationPath(path + this.props.directiveName + '.js'),
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
        this.props.serviceName = utils.capitalize(this.props.componentName.toUpperCase()) + 'Service';
        this.fs.copyTpl(
          this.templatePath('_service.js'),
          this.destinationPath(path + this.props.serviceName + '.js'),
          this.props
        );
        break;
    }
    
  }
});
