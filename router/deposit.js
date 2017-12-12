const MySql = require('mysql');
const querystring = require("querystring");

function deposit(response, request) {
    var data = "";
    request.on('data', function (chunk) {
        data += chunk;

        // 获取用户名
        var username = data;

        // 连接数据库
        var connection = MySql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '19970212ZHzh',
            database: 'atm'
        });

        connection.connect(function () {
            console.log("成功连接数据库!");
        })

        var depositNum = 0;
        var querySql = "SELECT * FROM cash where username =" + username;
        connection.query(querySql, function (error, results, field) {
            if (error) {
                console.log(error);
            }
            console.log(results);
            depositNum = results[0].balance;

            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(depositNum.toString());
            response.end();

            connection.end();
        })

    })
}

exports.deposit = deposit;