var osieteControllers = angular.module('osieteControllers',
  ['jobListController','jobDetailController','loginController',
  'applicationController','questionController','indexController',
  'registerController', 'activeController', 'questionDetailController',
  'applyController'])

osieteControllers.controller('HomepageCtrl', ['$scope', 
  function($scope){
    $scope.title="my homepage";
    window.location="#/jobs";
  }]);
osieteControllers.controller('MessageCtrl', ['$scope',
  function($scope){
    $('#otherInfoTab li a').click(function(e) {
      e.preventDefault();//阻止a链接的跳转行为
      $(this).tab('show');//显示当前选中的链接及关联的content
    });

    var messages = [
      {
        from: 'weinan',
        to: 'biao',
        msg:'nihao'
      },
      {
        from: 'biao',
        to: 'weinan',
        msg:'hi'
      },
      {
        from: 'weinan',
        to: 'lina',
        msg:'aini'
      },
      {
        from: 'hong',
        to: 'lina',
        msg:'aini'
      },
      {
        from: 'lina',
        to: 'hong',
        msg:'aini'
      },
      {
        from: 'lina',
        to: 'weinan',
        msg:'hehe'
      },
      {
        from: 'biao',
        to: 'weinan',
        msg:'hehe'
      },
      {
        from: 'biao',
        to: 'weinan',
        msg:'momoda'
      }
    ]

    $scope.messages =  _.groupBy(messages, function(message){ 
      if (message.from === 'weinan' || message.to === 'weinan') {
        return message.from === 'weinan' ? message.to : message.from
      }  
    });
    delete $scope.messages.undefined
    
    $scope.clickTab = function(key){
      console.log(key);
      $scope.selectUser = key
      $scope.data = $scope.messages[key];
    }

    $scope.msgReply = function(){
      var newMsg = {
        from:'weinan',
        to:$scope.selectUser,
        msg:$scope.msg
      }
      $scope.msg='';
      $scope.data.push(newMsg);
    }

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

osieteControllers.controller('ApplicationDetailCtrl', ['$scope', 
  function($scope){
    
  }]);

osieteControllers.controller('FeedbacksCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){

     AjaxService.loadFeedbacks('Weinan', function(data, status, headers, config) {     
        $scope.feedbacks = data; 
      }, function() {
      });
    
  }]);

















