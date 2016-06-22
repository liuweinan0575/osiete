
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var nodemailer = require('nodemailer');
var multer  = require('multer');
var transporter = nodemailer.createTransport('smtps://support@osiete.com.cn:JWadmin123@smtp.exmail.qq.com');
var alertMsg = {
  noUser: 'No this user!',
  loginSuccess: 'Login successfully!',
  pwdIncorrect: 'Password not correct!'
}

/// 1. dummy db object
var mockDB = {};

// init fake json data
(function() {

  const dirpath = path.join(__dirname, '/data');

  function readFile(filename, cb) {
    fs.readFile(filename, function(err, data) {
      if (err) return cb(err);
      try {
        cb(null, JSON.parse(data));
      } catch (exception) {
        cb(exception);
      }
    });
  }

  fs.readdir(dirpath, function(err, files) {
    if ( err ) return console.error('error in reading data:', err);

    files.forEach(function(item, index) {
      const filepath = path.join(dirpath, '/', item);
      const key = item.replace(/\..*/, '');
      // console.log('files:', index, item, key, filepath);

      readFile(filepath, function(err, data) {
        if (err) return console.error(err);
        // console.log('TAG:', key, filepath);
        mockDB[key] = data;
      });
    });
  });

}());


/// 2. 
var app = express();
app.use(multer({ dest: './public/uploads',rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
// api router

router.get('/:key', function(req, res) {
  console.log('get:', req.params, req.query, req.body);
  var _json = _getData(req.params, req.query);
  if( _json.error ) res.status(404).json(_json);
  else res.json(_json);
})
.post('/:key', function(req, res) {
  console.log('post:', req.params, req.query, req.body);
  var _json = _getData(req.params, req.body);
  if( _json.error ) res.status(404).json(_json);
  else res.json(_json);
});

function _getData(params, query) {
  var key = params && params.key;
  var _json = mockDB[key];

  if( !_json ) {
    _json = { error:true, message:'unknown key', obj:params };
  }
  return _json;
}

/// 3. init mongo db
var db = require('mongoskin').db('mongodb://localhost:27017/osiete');

// questions.insert({
//     id:"question1",
//     title:"深刻ではないのですが、少し困っています",
//     user:"pesyaua",
//     content:"LFヨミドラSヨミドラ、エスカマリ、エスカマリ、暗黒ゼウスの闘技場編成で、様々な降臨や高難易度ダンジョンなど周回は可能でしょうか？",
//     viewCount:37,
//     answerCount:1,
//     date:"2016/2/12 22:40:33"
//   }, function(err, result) {
//     if (err) throw err;
//     if (result) console.log('Added!');
// });

/// 4. ajax api
var anotherRouter = express.Router();

var 
  users = db.collection('users'),
  questions = db.collection('questions'),
  responses = db.collection('responses'),
  comments = db.collection('comments'),
  jobs = db.collection('jobs'),
  feedbacks = db.collection('feedbacks');

/// for questions
anotherRouter.get('/questions', function(req, res){  
  questions.find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.get('/questions/:id', function(req, res){  
  questions.find({id: req.params.id}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.post('/questions/add', function(req, res){ 
  questions.insert(req.body, {}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.get('/questions/viewCountPlus/:questionId', function(req, res){
  questions.findAndModify({id: req.params.questionId}, [], {$inc:{viewCount:1}}, {new: true, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.get('/responses/:questionId', function(req, res){
  responses.find({questionId: req.params.questionId}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.post('/responses/add', function(req, res){  
  responses.insert(req.body, {}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});

// for jobs
anotherRouter.get('/jobs', function(req, res){  
  jobs.find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.post('/jobs/add', function(req, res){  
  jobs.insert(req.body, {}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.post('/jobs/apply', function(req, res){ 
  var body = req.body; 
  jobs.findAndModify({id: body.jobId}, [], {$push:{bidderIds:body.applyUserId}}, {new: false, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.post('/comments/add', function(req, res){ 
  var body = req.body; 
  comments.insert(req.body, {}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.post('/jobs/fail', function(req, res){ 
  var body = req.body; 
  jobs.findAndModify({id: body.jobId}, [], {$set:{status:'deleted'}}, {new: false, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.post('/jobs/win', function(req, res){ 
  var body = req.body; 
  jobs.findAndModify({id: body.jobId}, [], {$set:{status:'succeed', winnerId:body.bidderId}}, {new: false, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.get('/jobs/:id', function(req, res){  
  jobs.find({id:req.params.id}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.get('/jobs/byUserId/:userId', function(req, res){ 
  jobs.find({ownerId:req.params.userId}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.get('/jobs/byBidderId/:userId', function(req, res){ 
  jobs.find({bidderIds:req.params.userId}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// for user
anotherRouter.post('/users/add', function(req, res){ 
  var user =  req.body;
  jobs.find({account:user.account}).toArray(function(err, result) {
    if (err) throw err;
    if (result.length===0) {
      res.json({ok: 0});
    }else{
      users.insert(req.body, {}, function(err, result){  
        if (err) throw err;
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'support@osiete.com.cn', // sender address
            to: user.account, // list of receivers
            subject: '用户激活', // Subject line
            html: 'Dear user, <br > 请点击下面的链接进行激活：<br ><b>http://192.168.1.100:3000/#/active/'+user.id+'</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        res.json({ok: 1});
      });
    }
  });
});
anotherRouter.get('/users/activeUser/:id', function(req, res){  
  users.find({id: req.params.id}).toArray(function(err, result) {
    if (err) throw err;
    var user = result[0];
    console.log(user);
    if (user.status==='unValid') {
      users.findAndModify({id:user.id}, [], {$set:{status:'valid'}}, {new: false, upset: true}, function(err, result){  
        if (err) throw err;
        res.json({ok: 1, user: user});
      });      
    }else{
      res.json({ok: 0});
    }
    
  });
});
anotherRouter.get('/users/ability/:id', function(req, res){ 
  users.findAndModify({id:req.params.id}, [], {$set:{ability:true}}, {new: false, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.get('/users/personAuth/:id', function(req, res){ 
  users.findAndModify({id:req.params.id}, [], {$set:{personAuth:true}}, {new: false, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.post('/users/modify', function(req, res){ 
  var user =  req.body;
  users.findAndModify({id:user.id}, [], user, {new: false, upset: true}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.post('/users/login', function(req, res){ 
  var user =  req.body;
  console.log(user.account)
  users.find({account: user.account}).toArray(function(err, result) {
    if (err) throw err;
    var backJson = {
      ok:1
    };
    if (result.length === 0) {
      backJson.ok=0;
      backJson.message = alertMsg.noUser; 
    } else {
      if (user.pwd === result[0].pwd){
        backJson.ok=1;
        backJson.message = alertMsg.loginSuccess;
        backJson.user = result[0];
      } else {
        backJson.ok=0;
        backJson.message = alertMsg.pwdIncorrect;
      }
    }
    res.json(backJson);
  });
  
});
anotherRouter.get('/users/findUserById/:id', function(req, res){
  var ids = req.params.id.split(',');
  users.find({id: {$in:ids}}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.get('/users/findUserByAccount/:account', function(req, res){
  users.find({account: req.params.account}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.get('/users', function(req, res){
  users.find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.get('/comments/:userId', function(req, res){  
  comments.find({to: req.params.userId}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.post('/feedbacks/add', function(req, res){ 
  feedbacks.insert(req.body, {}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});
anotherRouter.get('/feedbacks', function(req, res){
  feedbacks.find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.post('/msg/add', function(req, res){ 
  db.collection('messages').insert(req.body, {}, function(err, result){  
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.get('/msg/:userId', function(req, res){
  var userId = req.params.userId;  
  db.collection('messages').find({ "$or" : [ { "fromUserId" : userId} , { "toUserId" : 
userId}]}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

anotherRouter.post('/files/add', function(req, res){   
    console.log(req.files);
    res.json({status:'ok'})
});

anotherRouter.post('/auth', function(req, res){ 
  var result = {};
  if (req.body.pwd === 'test123') {
    result.ok = 1;
  } else {
    result.ok = 0;
  }
  res.json(result);
});

/// 5. call served below /api
app.use('/api', router);
app.use('/ajax', anotherRouter);

module.exports = app;
