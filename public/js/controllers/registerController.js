angular.module('registerController', [])
.controller('RegisterCtrl', ['$scope', 'AjaxService', 'ngToast',
  function($scope, AjaxService, ngToast){
    //init loginInf obj
    $scope.registerInf = {
      id:uuid(),
      account: '',
      userType: 'chinese',
      obeyItem: false,
      status:'unValid',
      personAuth: false,
      ability: false,
      password: '',
      repetePwd: '',
      pwd:'',
      level:'1'
    }
    $scope.sixNumber = Math.floor(Math.random()*1000000)+'';
    $scope.validNumber = '';

    $scope.changeSixNumber = function(){
      $scope.sixNumber=Math.floor(Math.random()*1000000)+'';
    }

    $scope.register = function(){
      console.log($scope.registerInf)
      var isValid = true;
      var error = [];
      var registerInf = $scope.registerInf;
      if (!registerInf.obeyItem) {
        error.push('Please aggree the service item!');
        isValid = false;
      }
      if (!registerInf.account) {
        error.push('Account cannot be empty!');
        isValid = false;
      }
      if (!$scope.validNumber || $scope.validNumber!==$scope.sixNumber) {
        error.push('Wrong valid number!');
        isValid = false;
      }

      if (registerInf.password !== registerInf.repetePwd) {
        error.push('two passwords not the same!');
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
      delete registerInf.obeyItem;
      delete registerInf.repetePwd;
      registerInf.pwd = md5(registerInf.password);
      delete registerInf.password

      AjaxService.addUser(registerInf, function(data, status, headers, config) {
        console.log(data)
        if (data.ok === 1) {
          ngToast.create({
            className: 'success',
            content: 'Regist successfully, please go to your email to active your account!',
            dismissButton: true,
            dismissOnTimeout: true
          });
          window.location="#/login";
        }
      }, function() {

      });    
    }
    
  }]);