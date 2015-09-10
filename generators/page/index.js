'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../utils');

module.exports = yeoman.generators.Base.extend(utils.getGeneratorBase({
  prompting: function () {
    var done = this.async();
    this._optionOrPrompt([{
      name: 'pageName',
      type: 'input',
      message: 'What would you like to name the page?',
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
    this._nativeFs.mkdirSync(this.destinationPath(path));
    this._nativeFs.mkdirSync(this.destinationPath(path) + '/controllers');
    this._nativeFs.mkdirSync(this.destinationPath(path) + '/directives');
    this._nativeFs.mkdirSync(this.destinationPath(path) + '/services');
  }
}));
