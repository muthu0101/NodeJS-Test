var twitter = require('ntwitter');
var redis = require('redis');
var http = require('http');
var credentials = require('./credentials.js');


//create redis client                                                                                                                                                                                                                       
var client = redis.createClient();

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['awesome', 'google', 'rad', 'gnarly', 'groovy'] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
            if(tweet.text.indexOf("awesome") > -1) {
                client.incr('awesome');
            }
            if(tweet.text.indexOf("google") > -1) {
                client.incr('google');
            }
        });
}
);

/*
http.createServer(function (req, res) {
    client.get("google", function (error, awesomeCount) {
        if (error !== null) {
            //handle error here
            console.log("error: " + error);
        } else {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("The awesome count is " + awesomeCount);
        }
    });
}).listen(3000);

*/

var server = http.createServer(function (req, res) {
    client.mget(["awesome","google"], function(err, results) {
        if (err !== null) {
            //handle error here
            console.log("error: " + err);
        } else {
  	    var response = "<b>Hello from my http server!!</b>";
	    response += "<p>Total awesome: " + results[0] + "</p>";
	    response += "<p>Total google: " + results[1] + "</p>";
	    res.writeHead(200, {"Content-Type": "text/html"});
	    res.end(response);
        }
    });
}).listen(3000);