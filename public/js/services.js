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
					},
					jp:{
						title:"つなぐ",
					},
					en:{
						title:"Communication Station for Ch-Ja",
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
		loadJobListById: function(id, success, error) {
			$http({method: 'get', url:'ajax/jobs/'+id}).success(success).error(error);
		},
		loadJobListByUserId: function(userId, success, error) {
			$http({method: 'get', url:'ajax/jobs/byUserId/'+userId}).success(success).error(error);
		},
		loadJobListByBidderId: function(userId, success, error) {
			$http({method: 'get', url:'ajax/jobs/byBidderId/'+userId}).success(success).error(error);
		},
		applyJob: function(body, success, error) {
			$http.post('ajax/jobs/apply', body).success(success).error(error);
		},	
		failJob: function(body, success, error) {
			$http.post('ajax/jobs/fail', body).success(success).error(error);
		},
		winJob: function(body, success, error) {
			$http.post('ajax/jobs/win', body).success(success).error(error);
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
		abilityUser: function(id, success, error) {
			$http({method: 'get', url:'ajax/users/ability/'+id}).success(success).error(error);
		},
		personAuthUser: function(id, success, error) {
			$http({method: 'get', url:'ajax/users/personAuth/'+id}).success(success).error(error);
		},
		modifyUser: function(body, success, error) {
			$http.post('ajax/users/modify', body).success(success).error(error);
		},
		userLogin: function(body, success, error) {
			$http.post('ajax/users/login', body).success(success).error(error);
		},
		loadUserList: function(id, success, error) {
			$http({method: 'get', url:'ajax/users'}).success(success).error(error);
		},
		findUserById: function(id, success, error) {
			$http({method: 'get', url:'ajax/users/findUserById/'+id}).success(success).error(error);
		},
		findUserByAccount: function(account, success, error) {
			$http({method: 'get', url:'ajax/users/findUserByAccount/'+account}).success(success).error(error);
		},
		addComment: function(body, success, error) {
			$http.post('ajax/comments/add', body).success(success).error(error);
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
		addMsg: function(body, success, error) {
			$http.post('ajax/msg/add', body).success(success).error(error);
		},
		loadMsgByUserId: function(userId, success, error) {
			$http({method: 'get', url:'ajax/msg/'+userId}).success(success).error(error);
		},
		addFiles: function(body, success, error) {
			$http.post('ajax/files/add', body).success(success).error(error);
		},
		authSystem: function(body, success, error) {
			$http.post('ajax/auth', body).success(success).error(error);
		}
	}
})
;


