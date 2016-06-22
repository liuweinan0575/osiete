angular.module('loginController', [])
.controller('LoginCtrl', ['$scope', 'AjaxService', 'ngToast',
  function($scope, AjaxService, ngToast){
    //init loginInf obj
    $scope.loginInf = {
      account: '',
      password:''
    }
    $scope.sixNumber = Math.floor(Math.random()*1000000)+'';
    //event function
    $scope.changeSixNumber = function(){
      $scope.sixNumber=Math.floor(Math.random()*1000000)+'';
    }
    $scope.login = function(){
      // if ($scope.account==='liu') {      
      //   $scope.$emit("LoginOperation", "publisher");
      //   console.log('the login user is a publisher')
      //   window.location="#/";
      // };
      var loginInf = $scope.loginInf;
      var isValid = true;
      var error = [];
      if (!loginInf.account) {
        error.push(alertMsg.accountNotEmpty);
        isValid = false;
      }

      if (!loginInf.password) {
        error.push(alertMsg.pwdNotEmpty);
        isValid = false;
      }

      if (!$scope.validNumber || $scope.validNumber!==$scope.sixNumber) {
        error.push(alertMsg.inValidNum);
        isValid = false;
      }

      if (!isValid) {
        ngToast.create({
          className: 'success',
          content: error.join('<br>'),
          dismissButton: true,
          dismissOnTimeout: true
        }); 
        return;
      }

      loginInf.pwd = md5(loginInf.password);
      delete loginInf.password;
      
      AjaxService.userLogin(loginInf, function(data, status, headers, config) {
        if (data.ok === 1) {
          var user = data.user;
          ngToast.create({
            className: 'success',
            content: data.message,
            dismissButton: true,
            dismissOnTimeout: true
          }); 
          $scope.$emit("LoginOperation", user);
          localStorage.setItem("user",JSON.stringify(user));
          var exdate=new Date();
          exdate.setDate(exdate.getDate()+1);
          document.cookie="userName="+(user.name?user.name:user.account)+";expires="+exdate.toGMTString();
          window.location="#/jobs";
        }else{
          ngToast.create({
            className: 'danger',
            content: data.message,
            dismissButton: true,
            dismissOnTimeout: true
          }); 
        }

      }, function() {
      });       
    }
  }]);