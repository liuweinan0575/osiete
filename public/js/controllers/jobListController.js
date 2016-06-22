angular.module('jobListController', [])
.controller('JobListCtrl', ['$scope', 'JobList', 'AjaxService', 'ngToast',
  function($scope, JobList, AjaxService, ngToast){
    
    var jobs;
    AjaxService.loadJobList("dummyId", function(data, status, headers, config) {
      $scope.jobs = data;
      jobs = data;
    }, function() {
    });

    $scope.condition={
      evening: true,
      afternoon: true, 
      morning: true, 
      ability: false, 
      personAuth: false
    };

    $scope.search = function(){

      var condition = $scope.condition;
      
      if (condition.smaller>=0 && condition.larger>=10 && condition.smaller<condition.larger) {
        $scope.createNgToast('danger', alertMsg.numCompare);
        return;
      }
      $scope.jobs = _.filter(jobs, function(job) { 
        console.log(moment(condition.date).format('YYYY-MM-DD'));
        console.log(job.dateString);
        console.log(job.period);
        
        if (condition.date && moment(condition.date).format('YYYY-MM-DD') !== job.dateString) {
          return false;
        }
        if (!condition[job.period]) {
          return false;
        }
        // if (condition.ability !== job.ability) {
        //   return false;
        // }
        if (condition.personAuth && !job.personAuth) {
          return false;
        }
        if (condition.distict && condition.distict !== job.distict) {
          return false;
        }
        // if (condition.address && job.address.indexOf(condition.address) === -1) {
        //   return false;
        // }
        if (condition.smaller<job.moneyCh || condition.larger>job.moneyCh) {
          return false;
        }
        return true;

        
      });
    }

    $scope.reset = function(){
      $scope.condition={
        evening: true,
        afternoon: true, 
        morning: true, 
        ability: false, 
        personAuth: false
      };
      $scope.jobs = jobs;
    }
  }]); 