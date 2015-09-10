'use strict';
var optionOrPrompt = require('yeoman-option-or-prompt');
var fs = require('fs');
var s = require('underscore.string');

var insertBefore = function(haystack, needle, linesToInsert) {
  var lines = haystack.split('\n');

  var insertIndex = -1;
  lines.forEach(function(line, index) {
    if (line.indexOf(needle) > 0) {
      insertIndex = index;
    }
  });

  if (insertIndex < 0) {
    return haystack;
  }

  var spaces = '';
  while (lines[insertIndex].charAt(spaces.length) === ' ') {
    spaces += ' ';
  }

  lines.splice(insertIndex, 0, linesToInsert.split('\n').map(function(line) {
    return spaces + line;
  }).join('\n'));

  return lines.join('\n');
};

var rewriteFile = function(filePath, needle, templatePath, props) {
  var appContent = this.fs.read(filePath);
  var tempPath = this.destinationPath('.temp');
  this.fs.copyTpl(templatePath, tempPath, props);
  var newAppContent = insertBefore(appContent, needle, this.fs.read(tempPath));
  this.fs.delete(tempPath);
  this.fs.write(filePath, newAppContent);
};

var getGeneratorBase = function(base) {
  base._s = s;
  base._nativeFs = fs;
  base._optionOrPrompt = optionOrPrompt;
  base._rewriteFile = rewriteFile;
  base._copyTemplate = function(templatePath, destinationPath, props) {
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      props
      );
  };
  return base;
};

module.exports = {
  rewriteFile: rewriteFile,
  getGeneratorBase: getGeneratorBase
};
