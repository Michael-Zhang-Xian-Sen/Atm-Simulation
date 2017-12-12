// 对请求进行路由.
function route(handle, pathName, response, request){
    console.log("About to route a request for "+pathName);
    
    if( typeof handle[pathName] === 'function'){
        return handle[pathName](response,request,pathName);
    }else{
        console.log("No request handler found for " + pathName);
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }
    
}

exports.route = route;