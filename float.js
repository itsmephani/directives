ang.directive('float', [function () {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      var ele = angular.element(element);
      $(window).scroll(function(){
        if(bottomValue() > 1){
          ele.css('bottom', bottomValue);
        }
        else{
          ele.css('bottom', 0);
          ele.addClass('round-borders')
        }
      });
    }
  };
}]);

function bottomValue(){
  return $(document).height() - window.innerHeight - 222 - window.scrollY;
}
