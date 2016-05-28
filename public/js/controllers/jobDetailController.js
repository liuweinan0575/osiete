angular.module('jobDetailController', [])
.controller('JobDetailCtrl', ['$scope', '$routeParams', 'Strings', 'JobList', 'AjaxService',
  function($scope, $routeParams, Strings, JobList, AjaxService){

    $scope.apply={}
    AjaxService.loadJobListById($routeParams.jobId, function(data, status, headers, config) {
      console.log(data);
      // $scope.apply = _.filter(data, { id: $routeParams.jobId })[0];
      $scope.apply = data[0]
      $scope.apply.moneyJa = parseInt($scope.apply.moneyCh)*12;
      console.log($scope.apply);
      AjaxService.findUserById($scope.apply.ownerId, function(data, status, headers, config) {     
        $scope.owner = data[0];
        console.log($scope.owner)
        var level = $scope.owner.level;
        $scope.owner.jpLevel = level === '1'?'単語だけ読めるほど':(level === '2'?'簡単な文章読めるほど':(level === '3'?'簡単な会話できるほど':'ぺらぺら喋れるほど'));
      }, function() {
      });
      AjaxService.findCommentsByUserId($scope.apply.ownerId, function(data, status, headers, config) {     
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

    var user = $scope.user;
    console.log(user.personAuth)
    if (Object.keys(user).length===0) {
      $scope.applyType = 'no-login';
    } else {
      if (user.userType==='japanese') {
        $scope.applyType = '';
      }else{
        //user.userType === recruiter
        if (($scope.apply.personAuth && user.personAuth !== $scope.apply.personAuth) || ($scope.apply.ability && user.ability !== $scope.apply.ability)) {
          $scope.applyType = 'failure';
        }else{
          $scope.applyType = 'success';
        }
      }
    }

    $scope.applyJob = function(){
      if ($scope.apply.bidderIds.indexOf($scope.user.id)!==-1) {
        $scope.createNgToast('danger','you have already applied this job!');
        return;
      }
      var body = {
        jobId: $scope.apply.id,
        applyUserId: $scope.user.id
      };
      AjaxService.applyJob(body, function(data, status, headers, config) {     
        $scope.createNgToast('success','applied this job!');
      }, function() {
      });
      $scope.apply.bidderIds.push($scope.user.id);
    }

    $scope.submitChat = function(){
      $scope.newMsg = {
        id:uuid(),
        msg: $scope.chatContent,
        fromUserId: $scope.user.id,
        fromUserName: $scope.user.name,
        toUserId: $scope.apply.ownerId,
        toUserName: $scope.apply.ownerName,
        date: new Date,
        dateString: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      }
      console.log($scope.newMsg);

      AjaxService.addMsg($scope.newMsg, function(data, status, headers, config) {
        $('#chatModal').modal('hide');
        $scope.createNgToast('success','send msg to owner successly');
        $scope.chatContent='';
        }, function() {
      });
    }
  }]);