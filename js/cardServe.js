window.onload = function(){
    // 获取代表服务的标签
    var atmServe = document.getElementsByClassName("atm-serve-1");
    var queryServe = atmServe[0].getElementsByTagName("li")[0];
    var drawServe = atmServe[0].getElementsByTagName("li")[1];
    var depositServe = atmServe[0].getElementsByTagName("li")[2];
    var transServe = atmServe[0].getElementsByTagName("li")[3];

    // 绑定事件
    queryServe.addEventListener("click",doQuery);

    // 接收返回的用户信息
    var loginMsg = document.getElementsByClassName("user")[0];
    var user = "04152072";
    loginMsg.textContent = "当前用户为:"+user+",请选择所需服务";
}

// 添加信息
function addMsg(balance){
    // 创建余额标签
    var p = document.createElement("p");
    p.textContent = "您的可用余额为: "+balance;
    var msgContainer = document.getElementsByClassName("tips-text")[0];
    msgContainer.appendChild(p);

    // 创建是否打印当前余额信息
    var printMsg = document.createElement("p");
    printMsg.textContent = "是否打印当前余额信息?";
    msgContainer.appendChild(printMsg);
    
    var printBtn = document.createElement("button");
    printBtn.textContent = "是";
    var notprintBtn = document.createElement("button");
    notprintBtn.textContent = "否";
    var tipsBtn = document.getElementsByClassName("tips-btn");
    printBtn.className = "btn btn-primary";
    notprintBtn.className = "btn btn-primary second-btn";
    tipsBtn[0].appendChild(printBtn);
    tipsBtn[0].appendChild(notprintBtn);

}

// 查询余额
function doQuery(){
    // 获取当前用户
    var loginMsg = document.getElementsByClassName("user")[0];
    var user = loginMsg.textContent.split(":")[1].split(",")[0];

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:8000/deposit",true);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.send(user);

    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            clearMsg();
            addMsg(xmlHttp.responseText);
        }
    }
}

// 打印信息
function print(){
    // 更改提示文字
    var tipsText = document.getElementsByClassName("tips-text");
    var tipsBtn = document.getElementsByClassName("tips-btn");
    var pList = tipsText.getElementsByTagName("p");
    pList[1].textContent = "正在打印,请稍候......";
    
    // 动画效果,阻塞操作
    loading();
    setTimeout(function(){
        var barline = document.getElementsByClassName("barline");                
        var card = barline[0].getElementsByTagName("div");
        card[0].className = "card-loading hide";
        barline[0].className = "barline hide";

        // 按钮暂时停止作用
        var tipsBtn = document.getElementsByClassName("tips-btn");
        tipsBtn[0].disabled = "disabled";
        tipsBtn[1].disabled = "disabled";
    },2000)

    // 打印当前余额信息
    setTimeout(function(){
        // 
    },2000)
}

