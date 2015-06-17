wellthily.directive('backgroundImage', [function () {
  return {
    restrict: 'A',
    scope: {backgroundImage: '@'},
    link: function(scope, element, attrs) {
      var watcher = null;
      watcher = scope.$watch('backgroundImage', function(){
        element[0].style['background-image'] = 'url(' + attrs.backgroundImage + ')';
        element[0].style['background-size'] = '100% 100%';
        if(attrs.backgroundImage)
          watcher();
      });
    }
  };
}]);