ang.directive('imagePreview', [function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var URL = window.URL || window.webkitURL;
      element.bind('change', function(event){
        var tmppath = URL.createObjectURL(event.target.files[0]);
        $(attrs.imagePreview).fadeIn("fast").css('background-image', 'url('+tmppath+')');
      });
    }
  };
}]);