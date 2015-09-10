'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils');

module.exports = yeoman.generators.Base.extend(utils.getGeneratorBase({
  prompting: function() {
    var endpointPrompts = [{
        type: 'input',
        name: 'url',
        message: 'What URL would you like this endpoint to have?'
      }, {
        type: 'checkbox',
        name: 'methods',
        choices: ['GET', 'POST', 'PUT', 'DELETE'],
        message: 'What methods would you like this endpoint to accept?'
      }, {
        type: 'input',
        name: 'functionName',
        message: 'What would you like to name the Python function for this endpoint?'
      }, {
        type: 'confirm',
        name: 'another',
        message: 'Would you like to define another endpoint for this controller?',
        default: false
    }];
    var controllerNamePrompt = [{
        type: 'input',
        name: 'controllerName',
        message: 'What would you like to name your controller?'
    }];

    this.endpoints = [];
    var done = this.async();
    var performPrompt = function(includeControllerName) {
      var prompts = (includeControllerName ? 
        controllerNamePrompt.concat(endpointPrompts) : endpointPrompts);
      this.prompt(prompts, function(answers) {
          this.endpoints.push(answers);
          if (answers.controllerName) {
            this.controllerName = this._s.underscored(answers.controllerName);
          }
          if (answers.another) {
            performPrompt(false);
          } else {
            done();
          }
      }.bind(this));
    }.bind(this);
    performPrompt(true);
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_controller.py'),
      this.destinationPath('controllers/' + this.controllerName + '.py'), {
        controllerName: this._s(this.controllerName).camelize().capitalize().value() + 'Controller',
        endpoints: this.endpoints
      }
    );
  }
}));
