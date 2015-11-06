var http = require('http');
var fs = require('fs');
var static_contents = require('./static.js');
console.log(static_contents);
var server = http.createServer(function (request, response){
	static_contents(request, response);
});
server.listen(6789);
console.log('Running on 6789');