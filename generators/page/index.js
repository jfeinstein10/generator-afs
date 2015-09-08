'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var optionOrPrompt = require('yeoman-option-or-prompt');

module.exports = yeoman.generators.Base.extend({
  _optionOrPrompt: optionOrPrompt,

  prompting: function () {
    var done = this.async();
    this._optionOrPrompt([{
      name: 'pageName',
      type: 'input',
      message: 'What\'s the page name?',
      validate: function(answer) {
        return answer.indexOf('/') < 0;
      }
    }], function(answers) {
      this.props = answers;
      done();
    }.bind(this));
  },

  writing: function () {
    // TODO (jf): add to the routes JSON
    var path = 'static/app/' + this.props.pageName;
    fs.mkdirSync(this.destinationPath(path));
    fs.mkdirSync(this.destinationPath(path) + '/controllers');
    fs.mkdirSync(this.destinationPath(path) + '/directives');
    fs.mkdirSync(this.destinationPath(path) + '/services');
  }
});
