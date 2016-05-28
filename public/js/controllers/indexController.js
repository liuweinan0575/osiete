angular.module('indexController', [])
.controller('IndexCtrl', ['$scope', 'AjaxService', 'JobList', 'ngToast',
  function($scope, AjaxService, JobList, ngToast){
    
    // common object and functions for sublayer controller
    $scope.disticts = [
      { name: '上城区', id: '1' },
      { name: '下城区', id: '2' },
      { name: '西湖区', id: '3' },
      { name: '江干区', id: '4' },
    ];
    $scope.goBack = function() {
      history.back();
    }

    $scope.createNgToast = function(style, msg){
      ngToast.create({
        className: style,
        content: msg,
        dismissButton: true,
        dismissOnTimeout: true
      });
    }

    // begin
    //judge whether user is logined
    $scope.isLogined = 'unlogined';
    $scope.user={};

    if (document.cookie){
      var start = document.cookie.indexOf('userName');
      var end, user;
      if (start!==-1) {
        // end = document.cookie.indexOf(";", start);
        // $scope.name = document.cookie.substring(start,end);
        $scope.user = JSON.parse(localStorage.getItem("user"));
        $scope.name = $scope.user.name?$scope.user.name:$scope.user.account;
      } else {
        // cookie out of time
        localStorage.removeItem("user");
      }
    }
    AjaxService.loadMenus("dummyId", function(data, status, headers, config) {
        $scope.menus = data;
        if ($scope.user.userType) {
          $scope.isLogined = $scope.user.userType;
        }
        $scope.menuList = $scope.menus[$scope.isLogined];
    }, function() {
    });
    
    // event functions
    $scope.logout = function(){
      $scope.menuList = $scope.menus.unlogined;
      var reg=new RegExp("(^| )userName=([^;]*)(;|$)");
      var arr=document.cookie.match(reg)
      var exp = new Date();
      exp.setTime(exp.getTime()-1);
      document.cookie="userName="+arr[2]+";expires="+exp.toGMTString();
      localStorage.removeItem("user");
      $scope.isLogined = 'unlogined';
      $scope.menuList = $scope.menus.unlogined;
      window.location="#/";
    }


    $scope.submit = function(){
      $scope.feedback = {
        id:uuid(),
        content: $scope.fbContent,
        userId: $scope.user.id,
        userName: $scope.user.name,
        date: new Date,
        dateString: moment(new Date()).format('YYYY-MM-DD')
      }
      console.log($scope.feedback);

      AjaxService.addFeedback($scope.feedback, function(data, status, headers, config) {
        $('#feedbackModal').modal('hide');
        $scope.createNgToast('success','add feedback successly');
        $scope.feedback={};
        }, function() {
      });
       
    }
    
    // register login event function
    $scope.$on("LoginOperation",     
      function (event, msg) {
        console.log(msg);
        $scope.isLogined = msg.userType;
        $scope.name = msg.name?msg.name:msg.account;
        $scope.menuList = $scope.menus[msg.userType];
    });  
}]);