'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var endpointPrompts = [{
        type: 'input',
        name: 'url',
        message: 'What URL do you want this endpoint to have?'
      }, {
        type: 'input',
        name: 'functionName',
        message: 'What do you want the function for this endpoint to be named?'
      }, {
        type: 'checkbox',
        name: 'methods',
        choices: ['GET', 'POST', 'PUT', 'DELETE'],
        message: 'What methods do you want this endpoint to accept?'
      }, {
        type: 'confirm',
        name: 'another',
        message: 'Do you want to define another endpoint for this controller?',
        default: false
    }];
    var controllerName = [{
        type: 'input',
        name: 'controllerName',
        message: 'What do you want to name your controller?'
    }];

    this.endpoints = [];
    var done = this.async();
    var performPrompt = function(includeControllerName) {
      var prompts = (includeControllerName ? 
        controllerName.concat(endpointPrompts) : endpointPrompts);
      this.prompt(prompts, function(answers) {
          this.endpoints.push(answers);
          if (answers.controllerName) {
            this.controllerName = answers.controllerName;
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
      this.templatePath('controller.py'),
      this.destinationPath('controllers/' + this.controllerName + '.py'), {
        controllerName: this.controllerName,
        endpoints: this.endpoints
      }
    );
  }
});

