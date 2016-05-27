angular.module('questionController', [])
.controller('QuestionCtrl', ['$scope', 'AjaxService', 'ngToast',
  function($scope, AjaxService, ngToast){
    console.log($scope.user);
    console.log($scope.name);
    $scope.questions = [];
    $scope.question = {};
    AjaxService.loadQuestions("dummyId", function(data, status, headers, config) {
      console.log(data)
      var url = location.href;
      if(url.indexOf('myQuestion')>=0){
        $scope.questions = _.filter(data, { account: $scope.user.account });
      }else{
        $scope.questions = data;
      }
      console.log($scope.questions)
    }, function() {
    });
    
    $scope.add = function(){
      var question = $scope.question
      var newQueston = {
        "id":uuid(),
        "title":question.title,
        "user":$scope.name,
        "account":$scope.user.account,
        "content":question.content,
        "viewCount":0,
        "date":moment(new Date()).format('YYYY-MM-DD')
      }

      var isValid = true;
      var error = [];      
      if (!question.title) {
        error.push('Title cannot be empty!');
        isValid = false;
      }
      if (!question.content) {
        error.push('Content cannot be empty!');
        isValid = false;
      }
      if (!isValid) {
        $scope.createNgToast('danger', error.join('<br>'));
        return;
      }

      AjaxService.addQuestion(newQueston, function(data, status, headers, config) {
        console.log(data)
        $scope.questions.push(newQueston);
        ngToast.create({
          className: 'success',
          content: 'Add question successfully',
          dismissButton: true,
          dismissOnTimeout: true
        }); 
      }, function() {
      });     
      question.title = ''
      question.content = '';
    }  
  }]);