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
        error.push(alertMsg.aggreeSeriveItem);
        isValid = false;
      }
      if (!registerInf.account) {
        error.push(alertMsg.accountNotEmpty);
        isValid = false;
      } else {
        var re= /\w@\w*\.\w/;
        if(!re.test(registerInf.account)){
          error.push(alertMsg.accountNotEmpty);
          isValid = false;
        }
      }
      if (!$scope.validNumber || $scope.validNumber!==$scope.sixNumber) {
        error.push(alertMsg.inValidNum);
        isValid = false;
      }

      if (registerInf.password !== registerInf.repetePwd) {
        error.push(alertMsg.twoPwdNotSame);
        isValid = false;
      }
      if (registerInf.password.length<9) {
        error.push(alertMsg.pwdSimple);
        isValid = false;
      }

      if (!isValid) {
        $scope.createNgToast('success', error.join('<br>'));
        return;
      }
      delete registerInf.obeyItem;
      delete registerInf.repetePwd;
      registerInf.pwd = md5(registerInf.password);
      delete registerInf.password
      registerInf.name = registerInf.account;
      if (registerInf.userType==='chinese') {
        registerInf.level=[];
      };

      AjaxService.addUser(registerInf, function(data, status, headers, config) {
        console.log(data)
        if (data.ok === 1) {
          $scope.createNgToast('success', alert.registSuccess);
          window.location="#/login";
        } else {
          // data.ok === 0
          $scope.createNgToast('danger', alert.userExist);
        }
      }, function() {

      });    
    }
    
  }]);