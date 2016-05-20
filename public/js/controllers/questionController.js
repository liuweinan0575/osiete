angular.module('questionController', [])
.controller('QuestionCtrl', ['$scope', 'Questions', 'AjaxService',
  function($scope, Questions, AjaxService){
    AjaxService.loadQuestions("dummyId", function(data, status, headers, config) {
      var url = location.href;
      if(url.indexOf('myQuestion')>=0){
        $scope.questions = _.filter(data, { user: "weinan" });
      }else{
        $scope.questions = data;
      }
      Questions.set(data);
    }, function() {
    });
    
    $scope.add = function(){
      var question = $scope.question
      var newQueston = {
        "id":uuid(),
        "title":question.title,
        "user":"pesyaua",
        "content":question.content,
        "viewCount":0,
        "date":new Date()
      }
      AjaxService.addQuestion(newQueston, function(data, status, headers, config) {
        console.log(data)
      }, function() {
      });
      Questions.add(newQueston);
      question.title = ''
      question.content = '';
    }  
  }]);