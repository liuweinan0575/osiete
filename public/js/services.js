var osieteServices = angular.module('osieteServices', ['ngResource'])

osieteServices
.factory('Phone', ['$resource',
  function($resource){
    return $resource('data/:phoneId.json', {}, {
      query:{method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }
])
.factory('Strings', function(){
  	var string = {
					ch:{
						title:"中日交流小站",
						login:"登陆",
						help:"帮助",
						selectLanguage:"选择语言",
						homepage:"主页",
						myPublish:"我的发布",
						authorization:"认证",
						message:"消息",
						meetTime:"约定时间",
						morning:"上午",
						afternoon:"下午",
						evening:"晚上",
						personAuth:"身份认证",
						careerAuth:"职业认证",
						meetPlace:"约定地点",
						salaryHour:"时薪",
						search:"检索",
						meetTimeAndPlace:"约定时间和地点",
						authCondition:"认证状况"
					},
					jp:{
						title:"つなぐ",
						login:"ログアウト",
						help:"ヘルプ",
						selectLanguage:"言語を選ぶ",
						homepage:"ホームページ",
						myPublish:"私の求人",
						authorization:"認証",
						message:"メッセージ",
						meetTime:"待ち合わせ時間",
						morning:"午前",
						afternoon:"午後",
						evening:"夜",
						personAuth:"身元認証",
						careerAuth:"職業認証",
						meetPlace:"待ち合わせ場所",
						salaryHour:"時給",
						search:"検索",
						meetTimeAndPlace:"待ち合わせ時間と場所",
						authCondition:"認証状況"
					},
					en:{
						title:"Communication Station for Ch-Ja",
						login:"Login",
						help:"Help",
						selectLanguage:"Select Language",
						homepage:"Homepage",
						myPublish:"My Publish",
						authorization:"Authorization",
						message:"Message",
						meetTime:"Meet Time",
						morning:"Morning",
						afternoon:"Afternoon",
						evening:"Evening",
						personAuth:"PersonAuth",
						careerAuth:"CareerAuth",
						meetPlace:"Meet Place",
						salaryHour:"Salary in Hour",
						search:"Search",
						meetTimeAndPlace:"Meet Time and Place",
						authCondition:"Auth Condition"
					}
				};
		
    return {
    	get: function(lang){
    		return string[lang];
    	}
    }
  }
)
.factory('JobList', function(){
  	var jobList;		
    return {
    	get: function(id){
    		return _.filter(jobList, { id: id });
    	},
    	getAll:function(){
    		return jobList;
    	},
    	set:function(data){
    		jobList = data;
    	},
    	add:function(job){
    		jobList.push(job);
    	}
    }
  }
)
.factory('Questions', function(){
  	var questions;		
    return {
    	get: function(id){
    		return _.filter(questions, { id: id });
    	},
    	getAll:function(){
    		return questions;
    	},
    	set:function(data){
    		questions = data;
    	},
    	add:function(question){
    		questions.push(question);
    	}
    }
  }
)
.factory('Responses', function(){
  	var responses;		
    return {
    	getById: function(id){
    		return _.filter(responses, { questionId: id });
    	},    	
    	set:function(data){
    		responses = data;
    	}, 
    	add:function(response){
    		responses.push(response);
    		console.log(responses);
    	}
    }
  }
)
.factory('AjaxService',function($http){ 
	return {
		loadString: function(id, success, error) {
			$http({method: 'get', url:'api/string'}).success(success).error(error);
		},
		loadMenus: function(id, success, error) {
			$http({method: 'get', url:'api/menus'}).success(success).error(error);
		},
		loadQuestions: function(id, success, error) {
			$http({method: 'get', url:'ajax/questions'}).success(success).error(error);
		},
		findQuestionById: function(id, success, error) {
			$http({method: 'get', url:'ajax/questions/'+id}).success(success).error(error);
		},
		addQuestion: function(body, success, error) {
			$http.post('ajax/questions/add', body).success(success).error(error);
		},
		viewCountPlus: function(id, success, error) {
			$http({method: 'get', url:'ajax/questions/viewCountPlus/'+id}).success(success).error(error);
		},
		loadResponses: function(id, success, error) {
			console.log(id)
			$http({method: 'get', url:'ajax/responses/'+id}).success(success).error(error);
		},
		addResponse: function(body, success, error) {
			$http.post('ajax/responses/add', body).success(success).error(error);
		},		
		loadJobList: function(id, success, error) {
			$http({method: 'get', url:'ajax/jobs'}).success(success).error(error);
		},
		loadJobListByUserId: function(userId, success, error) {
			$http({method: 'get', url:'ajax/jobs/'+userId}).success(success).error(error);
		},
		
		addJobs: function(body, success, error) {
			$http.post('ajax/jobs/add', body).success(success).error(error);
		},
		addUser: function(body, success, error) {
			$http.post('ajax/users/add', body).success(success).error(error);
		},
		activeUser: function(id, success, error) {
			$http({method: 'get', url:'ajax/users/activeUser/'+id}).success(success).error(error);
		},
		modifyUser: function(body, success, error) {
			$http.post('ajax/users/modify', body).success(success).error(error);
		},
		userLogin: function(body, success, error) {
			$http.post('ajax/users/login', body).success(success).error(error);
		},
		findUserById: function(id, success, error) {
			$http({method: 'get', url:'ajax/users/findUserById/'+id}).success(success).error(error);
		},
		findCommentsByUserId: function(id, success, error) {
			$http({method: 'get', url:'ajax/comments/'+id}).success(success).error(error);
		},
		loadFeedbacks: function(id, success, error) {
			$http({method: 'get', url:'ajax/feedbacks/'}).success(success).error(error);
		},
		addFeedback: function(body, success, error) {
			$http.post('ajax/feedbacks/add', body).success(success).error(error);
		},
		addFiles: function(body, success, error) {
			$http.post('ajax/files/add', body).success(success).error(error);
		}

	}
})
;


