angular.module('applyController', [])
.controller('ApplyCtrl', ['$scope', 'Upload', 'AjaxService', 'ngToast',
  function($scope, Upload, AjaxService, ngToast){
    // $('#otherInfoTab a:first').tab('show');//初始化显示哪个tab 
    $('#otherInfoTab li a').click(function(e) {
      e.preventDefault();//阻止a链接的跳转行为
      $(this).tab('show');//显示当前选中的链接及关联的content
    });

    console.log($scope.user);
    console.log($scope.name); 

    $scope.apply = {
      id:uuid(),
      date:new Date(),
      dateString:moment(new Date()).format('YYYY-MM-DD'),
      time:new Date(),
      timeString:moment(new Date()).format('HH:mm'),
      distict:'1',
      address:'',
      course:'',
      moneyCh:0,
      personAuth:false,
      ability:false,
      ownerName:$scope.name,
      ownerId:$scope.user.id,
      ownerAccount:$scope.user.account,
      winnerId:null,
      bidderIds:[],
      period:''
    }

    $scope.ch2ja = function(){
      $scope.moneyJa = parseInt($scope.apply.moneyCh)*12;
    }
    $scope.publish = function(){
      var apply = $scope.apply;

      var isValid = true;
      var error = [];      
      if (!apply.address) {
        error.push('Address cannot be empty!');
        isValid = false;
      }
      if (!apply.course) {
        error.push('Course cannot be empty!');
        isValid = false;
      }
      if (!isValid) {
        ngToast.create({
          className: 'danger',
          content: error.join('<br>'),
          dismissButton: true,
          dismissOnTimeout: true
        }); 
        return;
      }

      apply.timeString = moment(apply.time).format('HH:mm')
      var num = apply.time.getHours();
      if (num>=17) {
        apply.period='evening';
      }else if (num>=12) {
        apply.period='afternoon';
      }else{
        apply.period='morning';
      }
      console.log(apply);
      AjaxService.addJobs(apply, function(data, status, headers, config) {
        console.log(data);
        ngToast.create({
          className: 'success',
          content: 'Add jobs sucessfully',
          dismissButton: true,
          dismissOnTimeout: true
        });
      }, function() {
      });
    }

    $scope.fileUpdate = function(){
      console.log($scope.files)

      Upload.upload({
            url: 'ajax/files/add',
            method: 'POST',
            headers: {'enctype': 'multipart/form-data'},
            data: {files: $scope.files}
        }).then(function (resp) {
            console.log('Success ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            
        });
    }

  }]);