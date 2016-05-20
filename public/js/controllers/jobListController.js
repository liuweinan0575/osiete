angular.module('jobListController', [])
.controller('JobListCtrl', ['$scope', 'JobList', 'AjaxService', 'ngToast',
  function($scope, JobList, AjaxService, ngToast){
    
    var jobs;
    AjaxService.loadJobList("dummyId", function(data, status, headers, config) {
      $scope.jobs = data;
      jobs = data;
    }, function() {
    });

    $scope.search = function(){

      var condition = $scope.condition;
      $scope.jobs = _.filter(jobs, function(job) { 
        if (condition.day && condition.day === job.day) {
          return true;
        }
        if ((condition.morning && condition.morning===job.time) || (condition.afternoon && condition.afternoon===job.time) || (condition.evening && condition.evening===job.time) ) {
          return true;
        }
        if (condition.place && condition.place === job.place) {
          return true;
        }
        if (condition.personAuth === job.personAuth || condition.careerAuth === job.careerAuth) {
          return true;
        }

        
      });
    }

    $scope.reset = function(){
      $scope.condition = {};
      $scope.jobs = jobs;
    }
  }]); 