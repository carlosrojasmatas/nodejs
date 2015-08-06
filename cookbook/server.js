var http = require("http");
var path = require("path");

var pages = [
	{route:'/',output:'Woohoo!'},
	{route:'about/this', output:"Level this"},
	{route:'about/node', output:"Level node"},
	{route: 'another page', output: function(){
		return 'Here ' + this.route;
	}}
];

var server = http.createServer(function(request,response){
	var lookup = path.basename(decodeURI(request.url));

	pages.forEach(function(page){
		if(page.route === lookup){
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(typeof page.output === 'function' ? page.output():page.output);
		}	
	});

	if(!response.finished){
		response.writeHead(400);
		response.end('Page Not Found');
	}
});


server.listen(8088);