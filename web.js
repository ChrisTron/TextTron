var express = require("express");
var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.post('/sendtext', function(request, response) {
	console.log('the cient sent:')
	console.log(request.body);
  response.send('text sent');
});

var port = process.env.PORT || 5000;
app.configure(function(){
	app.use(express.static(__dirname + '/static'));
});
app.listen(port, function() {
  console.log("Listening on " + port);
});