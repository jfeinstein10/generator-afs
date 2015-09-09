'use strict';

describe('Directive: <%= directiveName %>', function () {

  // Load the directive's module
  beforeEach(module('<%= angularAppName %>'));

  var element,
      scope;
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    // Place mocked variables on the scope here
  }));

  it('should do something', inject(function ($compile) {
    element = angular.element('<<%= directiveTag %>></<%= directiveTag %>>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('Hello, world');
  }));
});
