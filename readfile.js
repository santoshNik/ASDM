
var express=require("express");
var fs=require("fs");
var query=require("querystring");
var url=require("url");
var bodyparser=require("body-parser");
var app=express();

app.get("/",function(req,resp)
{
	fs.readFile("form.html",function(err,data)
	{
		if(err)
		{
			resp.write("Error");
			resp.end();
		}
		else
		{
			resp.write(data);
			resp.end();
		}
	});
});

app.post("/login",function(req,resp)
{
	var str="";
	req.on("data",function(d)
	{
		str+=d;
	});
	req.on("end",function()
	{
		var q=query.parse(str);
		var flag=false;
		fs.readFile("test.txt",function(err,data)
		{
			if(err)
			{
				resp.write("Error");
				resp.end();
			}
			else
			{
				var str1=data.toString();
				var str2=str1.replace(/\r\n|\n|\r/gm,",");
				var arr=str2.split(",");
				for(var i=0;i<arr.length;i++)
				{
					if(q.uname==arr[i])
					{
						if(q.pass==arr[i+1])
						{
							flag=true;
							break;
						}
					}
				}
				if(flag==true)
				{
					fs.readFile("calc.html",function(err,data)
					{
						resp.write(data);
						resp.end();
					});
				}
				else
				{
					resp.write("<h1>Validation Failed!!</h1>");
					resp.end();
				}
			}
		});
	});
});

/*app.get("/login/calc",function(req,resp)
{
	var u=url.parse(req.url);
	console.log(u);
	var q=query.parse(u.query);
	console.log(q);
	var sum=parseInt(q.num1)+parseInt(q.num2);
	resp.write("Sum: "+sum);
	resp.end();
});*/
app.use(bodyparser.urlencoded({extended:false}));
app.post("/login/calc",function(req,resp)
{
	var sum=parseInt(req.body.num1)+parseInt(req.body.num2);
	resp.write("Sum : "+sum);
	resp.end();
});
app.listen(2500);
console.log("Server is running on 2500");