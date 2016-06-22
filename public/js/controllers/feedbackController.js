angular.module('feedbackController', [])
.controller('FeedbacksCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){

    var pwd = window.prompt(alertMsg.auth, alertMsg.inputPwd);
    if (!pwd) {
      return;
    } else {
      AjaxService.authSystem({pwd:pwd}, function(data, status, headers, config) {     
        if (data.ok===0) {
          $scope.createNgToast('danger',alertMsg.sysPwdIncorrect);
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
              if (!window.confirm(alertMsg.isGivingAbility)) { 
                return;
              } 
              AjaxService.abilityUser(userId, function(data, status, headers, config) {     
                $scope.createNgToast('success', alertMsg.authAbilitySuccess);
              }, function() {
              });
           }
           $scope.personAuth = function(userId){
              if (!window.confirm(alertMsg.isGivingPerson)) { 
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