var osieteControllers = angular.module('osieteControllers',
  ['jobListController','jobDetailController','loginController',
  'applicationController','questionController','indexController',
  'registerController', 'activeController', 'questionDetailController',
  'applyController', 'messageController', 'applicationDetailController','feedbackController'])

osieteControllers.controller('HomepageCtrl', ['$scope', 
  function($scope){
    $scope.title="my homepage";
    window.location="#/jobs";
  }]);
osieteControllers.controller('ReadmeCtrl', ['$scope',
  function($scope){
    
  }]);

osieteControllers.controller('PersonInformationCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    $scope.user=$scope.loginedUser
    $scope.modify = function(){
      var user = $scope.user;
      delete user._id
      AjaxService.modifyUser(user, function(data, status, headers, config) {
        console.log(data)
      }, function() {
      }); 
    }
  }]);

osieteControllers.controller('CommentsCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    var comments;
    AjaxService.findCommentsByUserId('Weinan', function(data, status, headers, config) {     
        $scope.comments = data;
        comments = data;       
      }, function() {
      });
    
    $scope.filterComment = function(type){
      if (type!=='all') {
        $scope.comments = _.filter(comments, { type: type });
      }
      else{
        $scope.comments = comments
      }      
    }
  }]);

osieteControllers.controller('RecruitmentCtrl', ['$scope', 
  function($scope){
    
  }]);

osieteControllers.controller('RecruitmentDetailCtrl', ['$scope', 
  function($scope){
    
  }]);


















