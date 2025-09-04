describe('Testing directive', function() {
  var scope,
      elem,
      directive,
      compiled,
      html;
      
  beforeEach(function (){
    //load the module
    module('skts-guide');
    
    //set our view html.
    html = '<div pretty><button class="skts-knap-sekundaer-ext">xxx</button></div>';
    
    inject(function($compile, $rootScope) {
      //create a scope (you could just use $rootScope, I suppose)
      scope = $rootScope.$new();

//      debugger; // This is like setting a breakpoint
      
      //get the jqLite or jQuery element
      elem = angular.element(html);
      
      //compile the element into a function to 
      // process the view.
      compiled = $compile(elem);
      
      //run the compiled view.
      compiled(scope);
      
      //call digest on the scope!
      scope.$digest();
    });
  });

  it('Should set the text of the element to whatever was passed.', function() {
    //check to see if it's blank first.
    expect(elem.html() + elem.next().html()).toBe(elem.html() + '<pre class="prettyprint linenums">' + '&lt;div pretty&gt;&lt;button class="skts-knap-sekundaer-ext"&gt;xxx&lt;/button&gt;&lt;/div&gt;' + '</pre>');
  });
});
