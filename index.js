/// 1. app
var app = require('./app');
var port = 3000;


/// 2. serve index.html
app.get('/', function(req, res) {
	res.sendFile('/index.html')
});


/// 3. access app via browser on port
app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser. Ctrl+C to stop', port, port);
  }
});
