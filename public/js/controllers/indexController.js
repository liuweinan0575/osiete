angular.module('indexController', [])
.controller('IndexCtrl', ['$scope', 'AjaxService', 'JobList', 'ngToast',
  function($scope, AjaxService, JobList, ngToast){
    
    //judge whether user is logined
    $scope.isLogined = 'unlogined';
    if (document.cookie){
      var start = document.cookie.indexOf('userName');
      var end, user;
      if (start!==-1) {
        end = document.cookie.indexOf(";", start);
        user = document.cookie.substring(start,end);
        $scope.isLogined = 'publisher';
      }
    }
    AjaxService.loadMenus("dummyId", function(data, status, headers, config) {
        $scope.menus = data;
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
      localStorage.removeItem("user")
      $scope.isLogined = 'unlogined';
      $scope.menuList = $scope.menus.unlogined;
      window.location="#/";
    }


    $scope.submit = function(){
      $scope.feedback = {
        id:uuid(),
        content: $scope.fbContent,
        user: 'Weinan',
        date: new Date
      }
      console.log($scope.feedback);

      AjaxService.addFeedback($scope.feedback, function(data, status, headers, config) {
        $('#myModal2').modal('hide');
        ngToast.create({
          className: 'success',
          content: 'add feedback successly',
          dismissButton: true,
          dismissOnTimeout: true
        }); 
        $scope.feedback={};
        }, function() {
      });
       
    }
    
    // register login event function
    $scope.$on("LoginOperation",     
      function (event, msg) {
        console.log(msg)
        $scope.isLogined = msg.userType;
        $scope.name = msg.name;
        $scope.menuList = $scope.menus[msg.userType];
        $scope.loginedUser = msg;
    });      
}]);