'use strict';
var fs = require('fs');

module.exports = function(generator) {

  generator.writing.frontend = function() {
    fs.mkdirSync(this.destinationPath('static'));
    fs.mkdirSync(this.destinationPath('static/images'));
    fs.mkdirSync(this.destinationPath('static/js'));
    fs.mkdirSync(this.destinationPath('static/styles'));
    fs.mkdirSync(this.destinationPath('static/views'));
    fs.mkdirSync(this.destinationPath('templates'));
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('templates/index.html')
    );
  };

};

