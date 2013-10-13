var express = require("express");
var accountSid = process.env.twilSID;
		

var authToken = process.env.twilToken;
var twilio = require('twilio')
var client = new twilio.RestClient(accountSid, authToken)

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.post('/sendtext', function(request, response) {
	console.log('the client sent:');
	// console.log ("the type of message is:" + typeof(request.body.message));
	client.sms.messages.create({
	to:'+1' +request.body.phone,
	from:'+19252414697',
	body: request.body.message
	}, function(error, message) {
		// The HTTP request to Twilio will run asynchronously. This callback
		// function will be called when a response is received from Twilio
		// The "error" variable will contain error information, if any.
		// If the request was successful, this value will be "falsy"
			console.log(error);
		if (!error) {
		// The second argument to the callback will contain the information
		// sent back by Twilio for the request. In this case, it is the
		// information about the text messsage you just sent:
		console.log('Success! The SID for this SMS message is:');
		console.log(message.sid);
		 
		console.log('Message sent on:');
		console.log(message.dateCreated);
		}
		else {
		console.log('Oops! There was an error.');
		}
	});
});

var port = process.env.PORT || 5000;
app.configure(function(){
	app.use(express.static(__dirname + '/static'));
});
app.listen(port, function() {
  console.log("Listening on " + port);
});