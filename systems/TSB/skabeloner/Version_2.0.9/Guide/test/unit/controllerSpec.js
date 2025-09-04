'use strict';

describe('Testing controllers', function() {
  var $scope = null;
  var ctrl = null;
  
  /* A mocked version of our service, someService
   * we're mocking this so we have total control and we're
   * testing this in isolation from any calls it might
   * be making.
   */
  var mockService = {
    someAsyncCall: function (x){
      return 'weee';
    }
  }
  
  //you need to indicate your module in a test
  beforeEach(module('skts-guide'));

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function($rootScope, $controller) {
    //create a scope object for us to use.
    $scope = $rootScope.$new();

    //now run that scope through the controller function,
    //injecting any services or other injectables we need.
    ctrl = $controller('MenuListCtrl', {
      $scope: $scope,
      $location: null,
      $route: null, 
      $rootScope:  $rootScope
    });
  }));

  /* Test 1: The simplest of the simple.
   * here we're going to test that some things were 
   * populated when the controller function whas evaluated. */
  it('should start with foo and bar populated', function() {
    //just assert. $scope was set up in beforeEach() (above)
    expect($scope.menues.length).toEqual(13);
  });

  it("should return a class", function() {
    // tbd
  });
});
