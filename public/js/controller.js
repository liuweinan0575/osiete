var osieteControllers = angular.module('osieteControllers',
  ['jobListController','jobDetailController','loginController',
  'applicationController','questionController','indexController'])

osieteControllers.controller('HomepageCtrl', ['$scope', 
  function($scope){
    $scope.title="my homepage";
    window.location="#/jobs";
  }]);
osieteControllers.controller('QuestionDetailCtrl', ['$scope', 'Questions', 'Responses', '$routeParams', 'AjaxService',
  function($scope, Questions, Responses, $routeParams, AjaxService){
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
      Responses.set(data);
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
        date:"2016/3/25 20:32:33",
        user:"weinan",
        content:$scope.content
      }
      AjaxService.addResponse(newResponse, function(data, status, headers, config) {
        console.log(data)
        Responses.add(newResponse);
      }, function() {
      });
      
      $scope.content = '';  
      $('#myModal').modal('hide')
    }

  }]);
osieteControllers.controller('ApplyCtrl', ['$scope', 'Upload', 'AjaxService', 'JobList',
  function($scope, Upload, AjaxService, JobList){
    // $('#otherInfoTab a:first').tab('show');//初始化显示哪个tab 
    $('#otherInfoTab li a').click(function(e) {
      e.preventDefault();//阻止a链接的跳转行为
      $(this).tab('show');//显示当前选中的链接及关联的content
    });

    var user = JSON.parse(localStorage.getItem("user"));

    $scope.apply = {
      id:uuid(),
      day:'',
      time:'',
      place:'',
      detailPlace:'',
      course:'',
      moneyCh:'',
      personAuth:false,
      ability:false,
      createDate:new Date(),
      owner:user.id,
      period:''
    }

    $scope.ch2ja = function(){
      $scope.apply.moneyJa = parseInt($scope.apply.moneyCh)*12;
    }
    $scope.publish = function(){
      var apply = $scope.apply;
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
        JobList.add(apply);
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
osieteControllers.controller('MessageCtrl', ['$scope',
  function($scope){
    $('#otherInfoTab li a').click(function(e) {
      e.preventDefault();//阻止a链接的跳转行为
      $(this).tab('show');//显示当前选中的链接及关联的content
    });

    var messages = [
      {
        from: 'weinan',
        to: 'biao',
        msg:'nihao'
      },
      {
        from: 'biao',
        to: 'weinan',
        msg:'hi'
      },
      {
        from: 'weinan',
        to: 'lina',
        msg:'aini'
      },
      {
        from: 'hong',
        to: 'lina',
        msg:'aini'
      },
      {
        from: 'lina',
        to: 'hong',
        msg:'aini'
      },
      {
        from: 'lina',
        to: 'weinan',
        msg:'hehe'
      },
      {
        from: 'biao',
        to: 'weinan',
        msg:'hehe'
      },
      {
        from: 'biao',
        to: 'weinan',
        msg:'momoda'
      }
    ]

    $scope.messages =  _.groupBy(messages, function(message){ 
      if (message.from === 'weinan' || message.to === 'weinan') {
        return message.from === 'weinan' ? message.to : message.from
      }  
    });
    delete $scope.messages.undefined
    
    $scope.clickTab = function(key){
      console.log(key);
      $scope.selectUser = key
      $scope.data = $scope.messages[key];
    }

    $scope.msgReply = function(){
      var newMsg = {
        from:'weinan',
        to:$scope.selectUser,
        msg:$scope.msg
      }
      $scope.msg='';
      $scope.data.push(newMsg);
    }

  }]);
osieteControllers.controller('ReadmeCtrl', ['$scope',
  function($scope){
    
  }]);

osieteControllers.controller('ActiveCtrl', ['$scope', '$routeParams', 'AjaxService',
  function($scope, $routeParams, AjaxService){
    
    var userId = $routeParams.id;
    AjaxService.activeUser(userId, function(data, status, headers, config) {
      if (data.length!==0) {
          console.log('active successfully')
          var user = data[0];
          delete user._id
          $scope.user = user;
          console.log(user)
        } else {
          console.log('active failed')
        }
    }, function() {
    });

    $scope.finish = function(){
      AjaxService.modifyUser($scope.user, function(data, status, headers, config) {
        console.log(data)

      }, function() {
      }); 
    }
  }]);

osieteControllers.controller('RegisterCtrl', ['$scope', 'AjaxService', 'ngToast',
  function($scope, AjaxService, ngToast){
    //init loginInf obj
    $scope.registerInf = {
      id:uuid(),
      account: '',
      userType: 'chinese',
      obeyItem: false,
      sixNumber: Math.floor(Math.random()*1000000)+'',
      validNumber: '',
      status:'unValid',
      personAuth: false,
      ability: false,
      password: '',
      repetePwd: ''
    }

    $scope.changeSixNumber = function(){
      $scope.registerInf.sixNumber=Math.floor(Math.random()*1000000)+'';
    }

    $scope.register = function(){
      console.log($scope.registerInf)
      var isValid = true;
      var error = [];
      var registerInf = $scope.registerInf;
      if (!registerInf.obeyItem) {
        error.push('Please aggree the service item!');
        isValid = false;
      }
      if (!registerInf.account) {
        error.push('Account cannot be empty!');
        isValid = false;
      }
      if (!registerInf.validNumber || registerInf.validNumber!==registerInf.sixNumber) {
        error.push('Wrong valid number!');
        isValid = false;
      }

      if (registerInf.password !== registerInf.repetePwd) {
        error.push('two passwords not the same!');
        isValid = false;
      }

      if (!isValid) {
        ngToast.create({
          className: 'success',
          content: error.join('<br>'),
          dismissButton: true,
          dismissOnTimeout: true
        }); 
        return;
      }
      delete registerInf.obeyItem;
      delete registerInf.sixNumber;
      delete registerInf.validNumber;
      delete registerInf.repetePwd;
      registerInf.password = md5(registerInf.password);

      AjaxService.addUser(registerInf, function(data, status, headers, config) {
        console.log(data)
      }, function() {

      });    
    }
    
  }]);

osieteControllers.controller('PersonInformationCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    $scope.user=$scope.loginedUser
    $scope.modify = function(){
      var user = $scope.user;
      delete user._id
      AjaxService.modifyUser(user, function(data, status, headers, config) {
        console.log(data)
      }, function() {
      }); 
    }
  }]);

osieteControllers.controller('CommentsCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){
    var comments;
    AjaxService.findCommentsByUserId('Weinan', function(data, status, headers, config) {     
        $scope.comments = data;
        comments = data;       
      }, function() {
      });
    
    $scope.filterComment = function(type){
      if (type!=='all') {
        $scope.comments = _.filter(comments, { type: type });
      }
      else{
        $scope.comments = comments
      }      
    }
  }]);

osieteControllers.controller('RecruitmentCtrl', ['$scope', 
  function($scope){
    
  }]);

osieteControllers.controller('RecruitmentDetailCtrl', ['$scope', 
  function($scope){
    
  }]);

osieteControllers.controller('ApplicationDetailCtrl', ['$scope', 
  function($scope){
    
  }]);

osieteControllers.controller('FeedbacksCtrl', ['$scope', 'AjaxService',
  function($scope, AjaxService){

     AjaxService.loadFeedbacks('Weinan', function(data, status, headers, config) {     
        $scope.feedbacks = data; 
      }, function() {
      });
    
  }]);

















