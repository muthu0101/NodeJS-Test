// We need to 'require' the                                                                                                                            
// following modules                                                                                                                    
var express = require("express"),
    http = require("http"),
    path = require("path"),
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


// Create and return the word counts as a JSON object
app.get("/counts.json", function (req, res) {
    redisClient.mget(["awesome", "cool", "rad"] , function (error, results) {
	if (error !== null) {
            // handle error here                                                                                                                       
            console.log("ERROR: " + error);
        } else {
            var jsonObject = {
				"awesome": results[0],
                "cool": results[1],
                "rad": results[2]
                // ...etc
            };
            // use res.json to return JSON objects instead of strings
            res.json(jsonObject);
        }
    });
});