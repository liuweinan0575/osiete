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

osieteControllers.controller('BidderCtrl', ['$scope', 'AjaxService', '$routeParams',
  function($scope, AjaxService, $routeParams){
    console.log($routeParams)
    AjaxService.findUserById($routeParams.bidderId, function(data, status, headers, config) {     
        $scope.bidder = data[0];
        console.log($scope.bidder)
        AjaxService.findCommentsByUserId($scope.bidder.id, function(data, status, headers, config) {     
        $scope.types = _.countBy(data, function(comment) {
          return comment.type;
        });
      }, function() {
      });
      }, function() {
      });

    AjaxService.loadJobListById($routeParams.applyId, function(data, status, headers, config) {
      // $scope.apply = _.filter(data, { id: $routeParams.jobId })[0];
      $scope.apply = data[0];
      console.log($scope.apply)
    }, function() {
    });

    $scope.winJob = function(){
      if (!window.confirm("单击“确定”继续。单击“取消”停止。")) {
        return;
      }
      var body = {
        jobId: $scope.apply.id,
        bidderId: $scope.bidder.id
      };
      AjaxService.winJob(body, function(data, status, headers, config) { 
        console.log(data)   
        $scope.createNgToast('success','win this job!');
        $scope.apply.status = 'succeed';
      }, function() {
      });
      
    };

    $scope.submitComment = function(){
      var body = {
        id:uuid(),
        date:new Date(),
        dateString:moment(new Date()).format('YYYY-MM-DD'),
        fromUserId: $scope.user.id,
        toUserId: $scope.apply.ownerId,
        type: $scope.comment.type,
        content: $scope.comment.content,
        jobId: $scope.apply.id
      }
      AjaxService.addComment(body, function(data, status, headers, config) {     
        $scope.createNgToast('success','comment successfully!');
      }, function() {
      });
      
    }
      

  }]);




















