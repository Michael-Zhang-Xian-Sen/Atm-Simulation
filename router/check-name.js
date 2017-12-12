const MySql = require('mysql');
const querystring = require("querystring");
const http = require('http');

function checkName(response, request) {
    var msg = "";

    // 获取传来的数据
    var data = '';
    request.on('data',function(chunk){
        data += chunk;
        console.log("data = "+data);

        // 获取用户名和密码
        var username = data.split(":")[0];
        var password = data.split(":")[1];
        console.log("username = "+username);
        
        // 连接数据库
        var connection = MySql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '19970212ZHzh',
            database: 'atm'
        })

        connection.connect(function(){
            console.log("成功连接数据库!");        
        });
        // 从数据库中获取密码
        // var queryPw = "" + username;
        var pwDb = "";
        
        console.log("开始查询");
        var querySql = "SELECT * FROM user where username = "+username;
        connection.query(querySql, function (error, results, fields) {
            if (error) {
                console.log(error.message);
            }
            console.log(results);
            pwDb = results[0].password;
            console.log("password = "+password);
            console.log("pwDb = "+pwDb);

            // 比对密码
            if(password == pwDb){
                msg = "check complete";
                var today = new Date();
                var time = today.getTime() + 60*1000;
                var time2 = new Date(time);
                var timeObj = time2.toGMTString();
                response.writeHead(200, {
                    "Set-Cookie":"username=test",
                    "Content-Type": "text/plain" 
                });
            } else{
                msg = "check failed";
                response.writeHead(200, { "Content-Type": "text/plain" });
            }

            // 返回响应
            response.write(msg);
            console.log(response);            
            response.end();
            console.log("准备断开数据库连接");
            connection.end();
        }); 
    });   
}

function startServer(){
    http.createServer(function(req,res){
        var cookies = {};
        req.headers.cookies && req.headers.cookies.split(';').foreach(function(cookie){
            var parts = cookie.split('=');
            cookies[parts[0].trim()] = (parts[1]||'').trim();
        });

        console.log(cookies);
        
    })
}

exports.checkName = checkName;