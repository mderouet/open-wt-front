angular.module('MyApp', []).directive('animate', function(){
  return function(scope, elm, attrs) {
    setTimeout(function(){
      elm.addClass('animate');
    });
  };
})
