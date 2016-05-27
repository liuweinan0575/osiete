angular.module('questionDetailController', [])
.controller('QuestionDetailCtrl', ['$scope', '$routeParams', 'AjaxService', 'ngToast',
  function($scope, $routeParams, AjaxService, ngToast){
    console.log($scope.user);
    console.log($scope.name);
    var questionId = $routeParams.id;
    AjaxService.findQuestionById(questionId, function(data, status, headers, config) {      
      $scope.question = data[0];

      //viewCount +1
      AjaxService.viewCountPlus(questionId, function(data, status, headers, config) {
        $scope.question.viewCount += 1;
      }, function() {
      });
    }, function() {
    });
    
    //loading related responses
    AjaxService.loadResponses(questionId, function(data, status, headers, config) {     
      $scope.responses = data;
    }, function() {
    });
    
    $('#share-2').share({
      title: 'abc',
      description: 'hah',
      sites: ['qzone', 'qq', 'weibo','wechat']
   });

    $scope.reply = function(){
      var newResponse = {
        id:uuid(),
        questionId:questionId,
        date:moment(new Date()).format('YYYY-MM-DD'),
        user:$scope.name,
        account:$scope.user.account,
        content:$scope.content
      }
      var isValid = true;
      var error = [];      
      if (!$scope.content) {
        error.push('Content cannot be empty!');
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
      AjaxService.addResponse(newResponse, function(data, status, headers, config) {
        console.log(data)
        ngToast.create({
          className: 'success',
          content: 'Add response successfully',
          dismissButton: true,
          dismissOnTimeout: true
        }); 
        $scope.responses.push(newResponse);
      }, function() {
      });
      
      $scope.content = '';  
      $('#myModal').modal('hide');
    }

  }]);