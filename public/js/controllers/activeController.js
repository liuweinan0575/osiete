angular.module('activeController', [])
.controller('ActiveCtrl', ['$scope', '$routeParams', 'AjaxService', 'ngToast',
  function($scope, $routeParams, AjaxService, ngToast){
    
    var userId = $routeParams.id;
    $scope.user = {};
    AjaxService.activeUser(userId, function(data, status, headers, config) {
      if (data.ok===1) {
      	$scope.user = data.user;
      	delete $scope.user._id;
        $scope.createNgToast('success', alertMsg.activeSuccess);
        localStorage.setItem("user",JSON.stringify(user));
      } else {
        $scope.createNgToast('danger', alertMsg.activeFailed);
        window.location="#/login";
      }
    }, function() {
      $scope.createNgToast('danger', 'url incorrect');
      window.location="#/login";
    });

    $scope.finish = function(){
      AjaxService.modifyUser($scope.user, function(data, status, headers, config) {
        console.log(data)
        if (data.ok === 1) {
          $scope.createNgToast('success', alertMsg.updateUserInfo);
          window.location="#/login";
        }
      }, function() {
      }); 
    }
  }]);