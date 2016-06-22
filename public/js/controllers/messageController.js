angular.module('messageController', [])
.controller('MessageCtrl', ['$scope', 'AjaxService', 'ngToast',
  function($scope, AjaxService, ngToast){
    $('#otherInfoTab li a').click(function(e) {
      e.preventDefault();//阻止a链接的跳转行为
      $(this).tab('show');//显示当前选中的链接及关联的content
    });

    $scope.messages = [];
    var user = $scope.user;
    AjaxService.loadMsgByUserId(user.id, function(data, status, headers, config) {
      $scope.hasContact = data.length===0?false:true;
      $scope.messages =  _.groupBy(data, function(message){ 
        if (message.fromUserName === user.name || message.toUserName === user.name) {
          return message.fromUserName === user.name ? message.toUserName : message.fromUserName;
        }  
      });
      delete $scope.messages.undefined;
      console.log($scope.messages);
    }, function() {
    });
    
    
    $scope.clickTab = function(key){
      console.log(key);
      $scope.selectUser = key;
      $scope.data = $scope.messages[key];
    }

    $scope.msgReply = function(){
      var oldMsg = $scope.data[0];
      $scope.newMsg = {
        id:uuid(),
        msg: $scope.replyContent,
        fromUserId: $scope.user.id,
        fromUserName: $scope.user.name,
        toUserId: oldMsg.fromUserId,
        toUserName: oldMsg.fromUserName,
        date: new Date,
        dateString: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      }
      console.log($scope.newMsg);

      AjaxService.addMsg($scope.newMsg, function(data, status, headers, config) {
        $scope.createNgToast('success', alertMsg.sentMsgSuccess);
        $scope.replyContent='';
        $scope.data.push($scope.newMsg);
        }, function() {
      });
    }
  }]);