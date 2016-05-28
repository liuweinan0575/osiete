angular.module('feedbackController', [])
.controller('FeedbacksCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){

    var pwd = window.prompt("认证","请输入密码");
    if (!pwd) {
      return;
    } else {
      AjaxService.authSystem({pwd:pwd}, function(data, status, headers, config) {     
        if (data.ok===0) {
          $scope.createNgToast('danger','wrong system password');
        } else {
          $scope.createNgToast('success','auth successfully');
          AjaxService.loadFeedbacks('dummyId', function(data, status, headers, config) {     
              $scope.feedbacks = data; 
            }, function() {
            });

           AjaxService.loadUserList('dummyId', function(data, status, headers, config) {     
              $scope.users = data; 
            }, function() {
            });

           $scope.ability = function(userId){
              if (!window.confirm("确定要给用户能力权限吗")) { 
                return;
              } 
              AjaxService.abilityUser(userId, function(data, status, headers, config) {     
                $scope.createNgToast('success','abilityUser successfully!');
              }, function() {
              });
           }
           $scope.personAuth = function(userId){
              if (!window.confirm("确定要给用户身份权限吗")) { 
                return;
              }
              AjaxService.personAuthUser(userId, function(data, status, headers, config) {     
                $scope.createNgToast('success','personAuthUser successfully!');
              }, function() {
              });
           }
        }
      }, function() {
      });
    }
  }]);