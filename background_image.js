wellthily.directive('backgroundImage', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    scope: false,
    scope: {backgroundImage: '@'},
    link: function(scope, element, attrs) {
      var watcher = null;
      var height = angular.element(element).hasClass('main-image') ? $rootScope.mainImageHeight : $rootScope.remainingImagesHeight;
      angular.element(element).bind('onerror', function(){

      });
      function setImage(src) {
        var img = new Image();

        angular.element(element).css('height', height + 'px');

        img.onload = function() {
          element[0].style['background-image'] = 'url(' + src + ')';
        };

        img.onerror = function() {
          if(attrs.placeHolder)
            element[0].style['background-image'] = 'url(' + attrs.placeHolder + ')';
          else
            angular.element(element).css('height', height + 'px');
        };

        img.src = src; // fires off loading of image
      }
      watcher = scope.$watch('backgroundImage', function(){

        if(scope.backgroundImage && (scope.backgroundImage != "" && scope.backgroundImage != '{}') ){
          setImage(attrs.backgroundImage);
        }else{
          element[0].style['background-image'] = 'url('+ attrs.placeHolder +')';
          angular.element(element).css('height', height + 'px');
        }

        if(scope.backgroundImage)
          watcher();
      });
    }
  };
}]);
