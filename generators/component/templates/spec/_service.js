'use strict';

describe('Service: <%= serviceName %>', function () {

  // Load the service's module
  beforeEach(module('<%= angularAppName %>'));

  // Instantiate service
  var <%= serviceName %>;
  beforeEach(inject(function (_<%= serviceName %>_) {
    <%= serviceName %> = _<%= serviceName %>_;
  }));

  it('should do something', function () {
    expect(!!<%= serviceName %>).toBe(true);
  });
});
