var express = require("express"),
    http = require("http"),
    path = require("path"),
	redisClient = require("redis").createClient(),
    app = express();

// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
});

// Create the http server and get it to                                                                                                                
// listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});
	
app.get("/counts.json", function	(req, res) {
    redisClient.get("awesome", function	(error, awesomeCount) {
	if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var jsonObject = {
		"awesome":awesomeCount
            };
            // use res.json to return JSON objects instead of strings
            res.json(jsonObject);
        }
    });
});