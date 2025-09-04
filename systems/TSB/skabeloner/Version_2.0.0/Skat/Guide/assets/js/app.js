'use strict';

/* App Module */

var app = angular.module('skts-guide', ['ngRoute', 'ngSanitize']).
config(function($routeProvider) {
  $routeProvider.
  when('/skts-introduktion', {templateUrl: 'partials/skts-introduktion.html', controller: ContentCtrl}).
  when('/skts-rammer', {templateUrl: 'partials/skts-rammer.html', controller: ContentCtrl}).
  when('/skts-menutyper', {templateUrl: 'partials/skts-menutyper.html', controller: ContentCtrl}).
  when('/skts-tags', {templateUrl: 'partials/skts-tags.html', controller: ContentCtrl}).
  when('/skts-links', {templateUrl: 'partials/skts-links.html', controller: ContentCtrl}).
  when('/skts-felter', {templateUrl: 'partials/skts-felter.html', css: "../assets/css/jquery-ui.custom.css", controller: ContentCtrl}).
  when('/skts-knapper', {templateUrl: 'partials/skts-knapper.html', controller: ContentCtrl}).
  when('/skts-linjer', {templateUrl: 'partials/skts-linjer.html', controller: ContentCtrl}).
  when('/skts-komponenter', {templateUrl: 'partials/skts-komponenter.html', controller: ContentCtrl}).
  when('/skts-position', {templateUrl: 'partials/skts-position.html', controller: ContentCtrl}).
  when('/skts-teksttyper', {templateUrl: 'partials/skts-teksttyper.html', controller: ContentCtrl}).
  when('/skts-sider', {templateUrl: 'partials/skts-sider.html', controller: ContentCtrl}).
  when('/skts-andet', {templateUrl: 'partials/skts-andet.html', controller: ContentCtrl}).
  when('/skts-javascript', {templateUrl: 'partials/skts-javascript.html', controller: ContentCtrl}).
  when('/skts-udgaaet', {templateUrl: 'partials/skts-udgaaet.html', controller: ContentCtrl}).
  otherwise({redirectTo: '/skts-introduktion'});
}).run( function($rootScope, $location) {
  /* Progress bar */
  /*
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if ($("#progress").length === 0) {
      $("body").append($("<div><dt/><dd/></div>").attr("id", "progress"));
      $("#progress").width((50 + Math.random() * 30) + "%");
    }
  });
  $rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
    $("#progress").width("101%").delay(200).fadeOut(400, function() {
      $(this).remove();
    });
  });
  */
}).run(function($rootScope, $templateCache) {
  $rootScope.$on('$viewContentLoaded', function() {
    /* $templateCache.removeAll(); */ /* ONLU Dev: Remove this when ready for Production */
    prettyPrint();
    window.jqfunc();
    window.jqmenu();
  });
}); 

app.directive("pretty", function () {
  return {
    restrict: "A",
    link: function ($scope, $elem, $attrs) {
      var tabstr = $elem.html().match(/[ \t]+/gi)[0];
      var regex = new RegExp("\n" + tabstr, "gi");
      var html = $elem.html().replace(regex, '\n');
      var str = $('<div/>').text($.trim(html)).html()
      .replace(/\t/g, '&nbsp;')
      .replace(/\s*style=\".*?\"/g, '')
      .replace(/skts-guide-frame/g, '')
      .replace(/skts-guide-fitme/g, '')
      .replace(/\bng-[a-z]+\b/g, '')
      .replace(/\s*class=\"\s*\"/g, '')
      .replace(/æ/g, '&&zwnj;aelig;')
      .replace(/ø/g, '&&zwnj;oslash;')
      .replace(/å/g, '&&zwnj;aring;')
      .replace(/Æ/g, '&&zwnj;AElig;')
      .replace(/Ø/g, '&&zwnj;Oslash;')
      .replace(/Å/g, '&&zwnj;Aring;');
      $elem.after('<pre class="prettyprint linenums">' + str + '</pre>');
    }
  };
});
