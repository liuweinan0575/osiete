var osieteApp = angular.module('osieteApp', ['ngRoute','ngToast', 'ngFileUpload','osieteControllers', 'osieteServices']);

osieteApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/', {
          templateUrl:'partials/homepage.html',
          controller: 'HomepageCtrl'
        }).
      when('/login', {
        templateUrl:'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/readme', {
        templateUrl:'partials/readme.html',
        controller: 'ReadmeCtrl'
      }).
      when('/login/reset', {
        templateUrl:'partials/login-reset.html',
        controller: 'LoginResetCtrl'
      }).
      when('/login/passwordReset', {
        templateUrl:'partials/login-password-reset.html',
        controller: 'LoginPasswordResetCtrl'
      }).
      when('/login/passwordReapply', {
        templateUrl:'partials/login-password-reapply.html',
        controller: 'LoginPasswordReapplyCtrl'
      }).
      when('/login/reactive', {
        templateUrl:'partials/login-reactive.html',
        controller: 'LoginReactiveCtrl'
      }).
      when('/register', {
        templateUrl:'partials/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/active/:id', {
        templateUrl:'partials/active.html',
        controller: 'ActiveCtrl'
      }).
      when('/pwChange', {
        templateUrl:'partials/pwChange.html',
        controller: 'PwChangeCtrl'
      }).
      when('/personInformation', {
        templateUrl:'partials/personInformation.html',
        controller: 'PersonInformationCtrl'
      }).
      when('/personInformation/auth', {
        templateUrl:'partials/personAuth.html',
        controller: 'PersonAuthCtrl'
      }).
      when('/recruitment', {
        templateUrl:'partials/application.html',
        controller: 'ApplicationCtrl'
      }).
      when('/recruitment/:id', {
        templateUrl:'partials/recruitment-detail.html',
        controller: 'RecruitmentDetailCtrl'
      }).
      when('/application', {
        templateUrl:'partials/application.html',
        controller: 'ApplicationCtrl'
      }).
      when('/application/:id', {
        templateUrl:'partials/application-detail.html',
        controller: 'ApplicationDetailCtrl'
      }).
      when('/question', {
        templateUrl:'partials/question.html',
        controller: 'QuestionCtrl'
      }).
      when('/myQuestion', {
        templateUrl:'partials/question.html',
        controller: 'QuestionCtrl'
      }).
      when('/question/:id', {
        templateUrl:'partials/question-detail.html',
        controller: 'QuestionDetailCtrl'
      }).
      when('/apply', {
        templateUrl:'partials/apply.html',
        controller: 'ApplyCtrl'
      }).
      when('/jobs', {
        templateUrl:'partials/job-list.html',
        controller: 'JobListCtrl'
      }).
      when('/jobs/:jobId', {
        templateUrl:'partials/job-detail.html',
        controller: 'JobDetailCtrl'
      }).
      when('/message', {
        templateUrl:'partials/message.html',
        controller: 'MessageCtrl'
      }).
      when('/comments', {
        templateUrl:'partials/comments.html',
        controller: 'CommentsCtrl'
      }).
      when('/bidder/:bidderId&:applyId', {
        templateUrl:'partials/bidder.html',
        controller: 'BidderCtrl'
      }).
      when('/feedbacks', {
        templateUrl:'partials/feedbacks.html',
        controller: 'FeedbacksCtrl'
      }).

      otherwise({
        redirectTo:'/'
      });
}]);
