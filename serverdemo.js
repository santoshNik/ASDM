var http=require('http');
var url=require("url");
var query=require("querystring");
function process_request(req,resp){
	      // var u=req.url;
		   //console.log("url:"+u);
		   var p=url.parse(req.url);
		   switch(p.pathname){
			   case '/':
			   resp.writeHead(200,{'Content-Type':'text/html'});
		       resp.write("<h1>hello world!</h1>");
		       resp.write("<h2>Welcome to nodejs</h2>");
		       resp.end("done");
			   break;
			   case '/home':
			   resp.writeHead(200,{'Content-Type':'text/html'});
		       resp.write("<h1>In home page</h1>");
		       resp.write("<h2>Welcome to nodejs home</h2>");
		        resp.end("done");
				break;
				case '/about':
				resp.writeHead(200,{'Content-Type':'text/html'});
		        resp.write("<h1>In about us</h1>");
		        resp.write("<h2>Welcome to about us</h2>");
				resp.write(p.query);
				var q=query.parse(p.query);
				console.log(q);
				resp.write("Addition :"+(parseInt(q.a)+parseInt(q.b)));
		        resp.end("done");
				break;
				default:
				resp.writeHead(200,{'Content-Type':'text/html'});
		        resp.write("<h1>In default case</h1>");
		        resp.write("<h2>Welcome to about us</h2>");
		        resp.end("done");
			   
			   
			   
		   }
		   console.log(p);
           

}

var server=http.createServer(process_request);
server.listen(2000);
console.log("server is running at port 2000");