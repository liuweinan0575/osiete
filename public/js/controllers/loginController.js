angular.module('loginController', [])
.controller('LoginCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    //init loginInf obj
    $scope.loginInf = {
      account: '',
      sixNumber: Math.floor(Math.random()*1000000)
    }
    
    //event function
    $scope.changeSixNumber = function(){
      $scope.loginInf.sixNumber=Math.floor(Math.random()*1000000);
    }
    $scope.login = function(){
      // if ($scope.account==='liu') {      
      //   $scope.$emit("LoginOperation", "publisher");
      //   console.log('the login user is a publisher')
      //   window.location="#/";
      // };
      var loginInf = $scope.loginInf;
      if (!loginInf.validNumber || loginInf.validNumber!=loginInf.sixNumber) {
        console.log('Please enter correct sixNumber!')
        $scope.loginInf.sixNumber = Math.floor(Math.random()*1000000);
        return;
      }
      AjaxService.userLogin($scope.loginInf, function(data, status, headers, config) {
        if (data.length!==0) {
          var user = data[0];
          $scope.$emit("LoginOperation", user);
          localStorage.setItem("user",JSON.stringify(user));
          var exdate=new Date();
          exdate.setDate(exdate.getDate()+1);
          document.cookie="userName="+user.name+";expires="+exdate.toGMTString();
          window.location="#/";  
        }else{
          console.log('no such user')
        }

      }, function() {
      });       
    }
  }]);