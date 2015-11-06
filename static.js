//var http = require('http');
var fs = require('fs');

module.exports = function (request, response){
	if (request){
		console.log("request URL was: ", request.url);
		//easiest case
		if (request.url === "/"){
			fs.readFile('./views/index.html', 'utf-8', function (errors, content){
				response.writeHead(200, {'Content-type': 'text/html'});
				response.write(content);
				response.end();
			});
		}else{
			//break the url path into parts
			var split_path = request.url.split("/");
			console.log(split_path);
			//second easiest case is a simple controller/method or folder/file request
			var folder = split_path[1];
			var file = split_path[2];
			//check if the file contains an extension...
			if (file.indexOf('.') > -1){
				//there's a file extension to pull out...
				console.log(file);
				var ext = file.substring(file.indexOf('.')+1);
				if (ext === 'css'){
					fs.readFile('./'+folder+'/'+file, function (errors, content){
						response.writeHead(200, {'Content-type': 'text/'+ext});
						response.write(content);
						response.end();
					});
				}
				else if (ext === 'html'){
					fs.readFile('./'+folder+'/'+file, function (errors, content){
						response.writeHead(200, {'Content-type': 'text/html'});
						response.write(content);
						response.end();
					});
				}
				else if (ext === 'js'){
					fs.readFile('./'+folder+'/'+file, function (errors, content){
						response.writeHead(200, {'Content-type': 'text/javascript'});
						response.write(content);
						response.end();
					});
				}
				else if (ext === 'jpg' || ext === 'gif' || ext === 'png'){
					console.log('image/'+ext);
					fs.readFile('./'+folder+'/'+file, function (errors, content){
						response.writeHead(200, {'Content-type': 'image/'+ext});
						response.write(content);
						response.end();
					});
				}
				else{
					response.end('File Not Found');
				}
			}
			else if (file === undefined){
				fs.readFile('./'+folder, 'utf-8', function (errors, content){
					response.write(content);
					response.end();
				});
			}
			else{
				//folder/folder2/file scenario like images/june/01.jpg
				var folder2 = file;
				var new_file = split_path[3];

			}
		}
	}
}