var http = require("http");
var url = require("url");

function start(route,handle){
    // 处理请求
    function onRequest(request, response){
        var pathName = url.parse(request.url).pathname;
        console.log("Request for "+pathName+" received.");
        console.log("Request content is ",request.body);
        route(handle, pathName, response, request);
    }
    
    // 监听8000端口
    http.createServer(onRequest).listen(8000);
    console.log("Server has started.");
}

module.exports.start = start;