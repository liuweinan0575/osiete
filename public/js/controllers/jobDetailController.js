angular.module('jobDetailController', [])
.controller('JobDetailCtrl', ['$scope', '$routeParams', 'Strings', 'JobList', 'AjaxService',
  function($scope, $routeParams, Strings, JobList, AjaxService){


    AjaxService.loadJobList("dummyId", function(data, status, headers, config) {
      console.log(data);
      $scope.apply = _.filter(data, { id: $routeParams.jobId })[0];
      console.log($scope.apply);
      AjaxService.findUserById($scope.apply.ownerId, function(data, status, headers, config) {     
        $scope.owner = data[0];
        var level = $scope.owner.jpLever;
        $scope.owner.jpLevel = level === '1'?'単語だけ読めるほど':(level === '2'?'簡単な文章読めるほど':(level === '3'?'簡単な会話できるほど':'ぺらぺら喋れるほど'));
      }, function() {
      });
      AjaxService.findCommentsByUserId('Weinan', function(data, status, headers, config) {     
        $scope.types = _.countBy(data, function(comment) {
          return comment.type;
        });       
      }, function() {
      });
    }, function() {
    });
    
    
    $('#otherInfoTab a').click(function(e) {
      e.preventDefault();//阻止a链接的跳转行为
      $(this).tab('show');//显示当前选中的链接及关联的content
    })

    var user = localStorage.getItem("user");
    if (!user) {
      $scope.applyType = 'no-login';

    } else {
      user = JSON.parse(user);
      if (user.userType==='publisher') {
        $scope.applyType = '';
      }else{
        //user.userType === recruiter
        if (user.personAuth && user.ability) {
          $scope.applyType = 'success';
        }else{
          $scope.applyType = 'failure';
        }
      }
    }

    $scope.applyJob = function(){
      console.log('applyJob');
    }

    $scope.submitChat = function(){

    }
  }]);