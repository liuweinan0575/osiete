angular.module('applicationController', [])
.controller('ApplicationCtrl', ['$scope', 'JobList', 'AjaxService', 'Strings',
  function($scope, JobList, AjaxService, Strings){
    var user = JSON.parse(localStorage.getItem("user"));
    AjaxService.loadJobListByUserId(user.id, function(data, status, headers, config) {
      JobList.set(data);
      $scope.allJobs = data;
      $scope.jobs = data;
    }, function() {
    });

    $("#my-calendar").zabuto_calendar({
      language: "en",today: true, cell_border: true,
      data: [
        {
          "date": "2016-04-14",
          "badge": true,
          "title": "Tonight",
          "body": "<p class=\"lead\">Party</p><p>Like it's 1999.</p>",
          "footer": "At Paisley Park",
          "classname": "purple-event"
        },
        {"date":"2016-04-13","badge":false,"title":"Example 1"}
      ],
      legend: [
                  {type: "text", label: "Special event", badge: "00"},
                  {type: "block", label: "Regular event", classname: 'purple'},
                  {type: "spacer"},
                  {type: "text", label: "Bad"},
                  {type: "list", list: ["grade-1", "grade-2", "grade-3", "grade-4"]},
                  {type: "text", label: "Good"}
              ],
      action: function() { 
        id = this.id;
        var day = id.split('_')[3];
        $scope.jobs = _.filter($scope.allJobs, function(job) { 
          if (moment(job.day).format('YYYY-MM-DD') === day) {
            return true;
          }
          return false;
        });
        $scope.$apply();
        console.log($scope.jobs);
      }
    });
  }]);