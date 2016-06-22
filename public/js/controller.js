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
    // $scope.user=$scope.loginedUser
    $scope.modify = function(){
      var user = $scope.user;
      delete user._id
      AjaxService.modifyUser(user, function(data, status, headers, config) {
        console.log(data);
        $scope.createNgToast('success', alertMsg.updateUserInfo);
        localStorage.setItem("user",JSON.stringify(user));
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

osieteControllers.controller('LoginResetCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    $scope.sixNumber=Math.floor(Math.random()*1000000)+'';   
    $scope.changeSixNumber = function(){
      $scope.sixNumber=Math.floor(Math.random()*1000000)+'';
    };
    $scope.resetPwd = function(){
      var re= /\w@\w*\.\w/;
      var isValid = true;
      var error = [];
      if(!re.test($scope.account)){
          error.push(alertMsg.accountNotEmpty);
          isValid = false;
      }
      if (!$scope.validNumber || $scope.validNumber!==$scope.sixNumber) {
        error.push(alertMsg.inValidNum);
        isValid = false;
      }
      if (!isValid) {
        $scope.createNgToast('success', error.join('<br>'));
        return;
      }

      AjaxService.findUserByAccount($scope.account, function(data, status, headers, config) {
        if (data.length===0) {
          $scope.createNgToast('danger', 'no such user');
        }else{
          $scope.createNgToast('success', 'new passwordReset');
          window.location="#/login/passwordReset";
        }
      }, function() {
      });
      
    };
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
      if (!window.confirm(alertMsg.selectUserAsWinner)) {
        return;
      }
      var body = {
        jobId: $scope.apply.id,
        bidderId: $scope.bidder.id
      };
      AjaxService.winJob(body, function(data, status, headers, config) { 
        console.log(data)
        $scope.createNgToast('success', alertMsg.winJob);
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
        $scope.createNgToast('success', alertMsg.commentSuccess);
      }, function() {
      });
      
    }
      

  }]);




















