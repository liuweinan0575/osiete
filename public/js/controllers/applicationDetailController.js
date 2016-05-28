angular.module('applicationDetailController', [])
.controller('ApplicationDetailCtrl', ['$scope', '$routeParams', 'AjaxService',
  function($scope, $routeParams, AjaxService){
    $('#otherInfoTab a').click(function(e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
      });
    $scope.apply={}
    AjaxService.loadJobListById($routeParams.id, function(data, status, headers, config) {
      console.log(data);
      // $scope.apply = _.filter(data, { id: $routeParams.jobId })[0];
      $scope.apply = data[0]
      $scope.apply.moneyJa = parseInt($scope.apply.moneyCh)*12;
      // AjaxService.findUserById($scope.apply.ownerId, function(data, status, headers, config) {     
      //   $scope.owner = data[0];
      //   console.log($scope.owner)
      //   var level = $scope.owner.level;
      //   $scope.owner.jpLevel = level === '1'?'単語だけ読めるほど':(level === '2'?'簡単な文章読めるほど':(level === '3'?'簡単な会話できるほど':'ぺらぺら喋れるほど'));
      // }, function() {
      // });
      var bidderIds = $scope.apply.bidderIds;
      if (bidderIds.length === 0) {
        $scope.bidders = [];
      }else{
        AjaxService.findUserById(bidderIds.toString(), function(data, status, headers, config) {
          $scope.bidders=data;
        }, function() {
        });
      }     
    }, function() {
    });

    $scope.failJob = function(){
      if (!window.confirm("单击“确定”继续。单击“取消”停止。")) {
        return;
      }

      var body = {
        jobId: $scope.apply.id,
      };
      AjaxService.failJob(body, function(data, status, headers, config) {     
        $scope.createNgToast('success','failed this job!');
        $scope.apply.status = 'deleted';
      }, function() {
      });
      
    }

  }]);