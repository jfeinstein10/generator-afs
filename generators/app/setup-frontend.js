'use strict';
var fs = require('fs');

module.exports = function(generator) {

  generator.writing.frontend = function() {
    fs.mkdirSync(this.destinationPath('static'));
    fs.mkdirSync(this.destinationPath('static/images'));
    fs.mkdirSync(this.destinationPath('static/js'));
    fs.mkdirSync(this.destinationPath('static/views'));
    fs.mkdirSync(this.destinationPath('templates'));
  };

};

