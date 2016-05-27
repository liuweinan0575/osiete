angular.module('activeController', [])
.controller('ActiveCtrl', ['$scope', '$routeParams', 'AjaxService', 'ngToast',
  function($scope, $routeParams, AjaxService, ngToast){
    
    var userId = $routeParams.id;
    $scope.user = {};
    AjaxService.activeUser(userId, function(data, status, headers, config) {
      if (data.length!==0) {
      	$scope.user = data[0];
      	delete $scope.user._id;
		ngToast.create({
			className: 'success',
			content: 'active successfully!',
			dismissButton: true,
			dismissOnTimeout: true
		});
        } else {
          ngToast.create({
            className: 'success',
            content: 'active failed! Please close this page',
            dismissButton: true,
            dismissOnTimeout: true
          });
        }
    }, function() {
    });

    $scope.finish = function(){
      AjaxService.modifyUser($scope.user, function(data, status, headers, config) {
        console.log(data)
        if (data.ok === 1) {
          ngToast.create({
            className: 'success',
            content: 'Update user info successfully!',
            dismissButton: true,
            dismissOnTimeout: true
          });
        }

      }, function() {
      }); 
    }
  }]);