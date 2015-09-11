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
      message: 'What would you like that route to be? (e.g. /search/:search_term)',
      when: function(answers) {
        return answers.hasRoute;
      }
    }, {
      name: 'pageName',
      type: 'input',
      message: function(answers) {
        return 'What page would you like the ' + answers.componentType + ' to belong to?';
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
      this.composeWith('afs:page', {options: {
        pageName: this.props.pageName
      }});
    }

    var path = 'static/app/' + this.props.pageName + '/' + this.props.componentType + 's/';
    switch (this.props.componentType) {
      case 'controller':
        this.props.controllerName = this._s.capitalize(this.props.componentName) + 'Ctrl';
        this._copyTpl('_controller.js', path + this.props.controllerName + '.js', this.props);
        this._copyTpl('spec/_controller.js', path + this.props.controllerName + '.spec.js', this.props);
        if (this.props.hasRoute) {
          var partialPath = 'static/partials/' + this.props.componentName + '.html';
          if (!this.fs.exists(this.destinationPath(partialPath))) {
            this._copyTpl('_controller.html', partialPath, this.props);
          }
          this._rewriteFile(
            'static/app/app.js',
            '/* generator-afs route needle */',
            '_route.js',
            this.props
          );
        }
        break;
      case 'directive':
        this.props.directiveName = this.props.componentName;
        this.props.directiveTag = this._s.dasherize(this.props.directiveName);
        this._copyTpl('_directive.js', path + this.props.directiveName + '.js', this.props);
        this._copyTpl('spec/_directive.js', path + this.props.directiveName + '.spec.js', this.props);
        this._copyTpl('_directive.html', path + this.props.directiveName + '.html', this.props);
        this._copyTpl('_directive.css', path + this.props.directiveName + '.css', this.props);
        break;
      case 'service':
        this.props.serviceName = this._s.capitalize(this.props.componentName.toUpperCase()) + 'Service';
        this._copyTpl('_service.js', path + this.props.serviceName + '.js', this.props);
        this._copyTpl('spec/_service.js', path + this.props.serviceName + '.spec.js', this.props);
        break;
    }

  }
}));
