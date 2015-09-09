'use strict';

describe('Controller: <%= controllerName %>', function () {

  // Load the controller's module
  beforeEach(module('<%= angularAppName %>'));

  var <%= controllerName %>,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= controllerName %> = $controller('<%= controllerName %>', {
      $scope: scope
      // Place mocked dependencies here
    });
  }));

  it('should do something', function () {
    expect(<%= controllerName %>.message).toBe('Hello, world');
  });
});
