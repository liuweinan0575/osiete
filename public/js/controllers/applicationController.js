angular.module('applicationController', [])
.controller('ApplicationCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    var user = $scope.user;
    console.log(user.id);
    if(location.href.indexOf('application')>-1){
      $scope.partUrl = 'application';
      AjaxService.loadJobListByUserId(user.id, function(data, status, headers, config) {
        afterAjax(data);
      }, function() {
      })
    }else{
      $scope.partUrl = 'jobs';
      AjaxService.loadJobListByBidderId(user.id, function(data, status, headers, config) {
        afterAjax(data);
      }, function() {
      })
    }
    

    var afterAjax = function(data) {
        $scope.allJobs = data;
        $scope.jobs = data;
        var calendarData = _.chain(data).countBy(function(job) {
            return job.dateString;
          }).pairs().map(function(day) {
            console.log(day)
            return {
              date: day[0],
              title: 'There are '+day[1]+'items'
            };
          }).value();
        console.log(calendarData);
        $("#my-calendar").zabuto_calendar({
        language: "en",today: true, cell_border: true,
        data: calendarData,
        legend: [
                    {type: "text", label: "Special event", badge: "00"},
                    {type: "block", label: "Today"},
                ],
        action: function() { 
          id = this.id;
          var day = id.split('_')[3];
          $scope.jobs = _.filter($scope.allJobs, function(job) { 
            if (job.dateString === day) {
              return true;
            }
            return false;
          });
          $scope.$apply();
        }
      });
    }  
  }]);