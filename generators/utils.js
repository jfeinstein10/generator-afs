'use strict';

var toCamelCase = function(string) {
  return string.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();        
  });
};

var underscorize = function(string) {
  return string.replace(/[A-Z]/g, function(char, index) {
      return (index !== 0 ? '_' : '') + char.toLowerCase();
  });
};

var dasherize = function(string) {
  return string.replace(/[A-Z]/g, function(char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
};

var capitalize = function(string) {
  return string[0].toUpperCase() + string.substring(1);
};

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

module.exports = {
  toCamelCase: toCamelCase,
  underscorize: underscorize,
  dasherize: dasherize,
  capitalize: capitalize,
  insertBefore: insertBefore,
  rewriteFile: rewriteFile
};
