ang.directive('videoPreview', [function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var URL = window.URL || window.webkitURL;
        var displayMessage = function() {
            var node = document.querySelector(attrs.videoPreview);

            return function displayMessage(message, isError) {
                node.innerHTML = message;
                node.className = isError ? 'error' : 'info';
            };
        }
        var playSelectedFile = function(event) {
            var file = this.files[0];

            var type = file.type;

            angular.element(attrs.videoPreview).remove();
            var selector = (attrs.videoPreview[0] == '#' ? "class='preview' id=" : "class= preview ") + attrs.videoPreview.substring(1);
            var html = '<video height="350" controls ' + selector + '>\
              <source src="movie.mp4" type="video/mp4"> \
              <source src="movie.ogg" type="video/ogg"> \
                Your browser does not support the video tag. \
              </video>';

            angular.element(this).after(html);

            var videoNode = document.querySelector(attrs.videoPreview);

            var canPlay = videoNode.canPlayType(type);

            canPlay = (canPlay === '' ? 'no' : canPlay);

            var message = 'Can play type "' + type + '": ' + canPlay;

            var isError = canPlay === 'no';

            displayMessage(message, isError);

            if (isError) {
                return;
            }

            var fileURL = URL.createObjectURL(file);

            videoNode.src = fileURL;
        }

      if (!URL) {
          displayMessage('Your browser is not supported!', true);

          return;
      }
      // add event listener
      element[0].addEventListener('change', playSelectedFile, false);
    }
  };
}]);