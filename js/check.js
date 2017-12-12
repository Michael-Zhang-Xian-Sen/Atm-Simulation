window.onload = function(){
    // 绑定事件
    var tipsBtn = document.getElementsByClassName("tips-btn");
    var btnList = tipsBtn[0].getElementsByTagName("button");

    // 绑定事件
    btnList[0].addEventListener('click',getCash);
    btnList[1].addEventListener('click',backToIndex);

    console.log("成功绑定事件!");
}

function backToIndex(){
    window.location = "./index.html"
    console.log("成功执行!")
}

// 插入银行卡
function insertCard() {
    // 显示文字
    loading();

    setTimeout(function () {
        // 隐藏动画
        var barline = document.getElementsByClassName("barline");                
        var card = barline[0].getElementsByTagName("div");
        card[0].className = "card-loading hide";
        barline[0].className = "barline hide";

        // 移除插入银行卡
        var btn = document.getElementsByClassName("tips-btn");
        var insert = btn[0].getElementsByTagName("button");
        insert[0].remove();

        // 文字更改
        var message = document.getElementsByClassName("tips-text");
        var pMessage = message[0].getElementsByTagName("p");
        var pMessage2 = document.createElement("p");
        pMessage[0].textContent = "成功读取银行卡!";
        pMessage2.textContent = "请输入密码(•̀ᴗ•́)و ̑̑";
        var divCard = document.createElement("div");
        message[0].appendChild(pMessage2);

        // 添加当前卡卡号
        var serveOption = document.getElementsByClassName("serve-option");
        var idText = document.createElement("p");
        idText.textContent = "卡号:";
        var idCard = document.createElement("span");
        idCard.textContent = "04152072";                    // 此处内容应由后台返回
        var back = btn[0].getElementsByTagName("button")[0];
        idText.appendChild(idCard);
        serveOption[0].appendChild(idText);

        // 添加输入框
        var passwordLabel = document.createElement("label");
        passwordLabel.textContent = "密码:";
        var inputPassword = document.createElement("input");
        inputPassword.type = "password";
        // btn[0].appendChild(passwordLabel);
        // btn[0].appendChild(inputPassword);
        serveOption[0].appendChild(passwordLabel);
        serveOption[0].appendChild(inputPassword);

        // 添加确定按钮
        var buttonPassword = document.createElement("button");
        buttonPassword.type = "submit";
        buttonPassword.textContent = "确定"
        buttonPassword.className = "btn btn-primary password-button";
        // btn[0].appendChild(buttonPassword);
        btn[0].insertBefore(buttonPassword,back);

        // 给点击确定密码绑定事件
        buttonPassword.addEventListener('click', function () {
            var pwData = inputPassword.value;
            var userData = idCard.textContent;

            // var sendMsg = "{\""+pwData+"\":"+userData+"\"}\"";
            var sendMsg = userData+":"+pwData;                

            // 创建 XMLHttpRequest 对象
            var xmlHttp;
            xmlHttp = new XMLHttpRequest();

            // 发送请求
            xmlHttp.open("POST", "http://localhost:8000/checkName", true)
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(sendMsg);
            console.log(xmlHttp);
            
            // 等待验证
            pMessage[0].textContent = "正在进行验证,请稍候";
            buttonPassword.disabled = "disabled";

            // 接收响应并跳转至新页面
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    if(xmlHttp.responseText == "check complete"){
                        pMessage[0].textContent = "验证成功,跳转至服务页面!"; 
                        // document.location = "./cardServe.html"                          
                    }else{
                        pMessage[0].textContent = "验证失败,返回主界面或重新输入密码";
                        inputPassword.textContent = "";
                        buttonPassword.disabled = "false";
                    }
                }
            }
        });

        message[0].appendChild(divCard);
    }, 2800);
}

// 选择取款服务
function getCash() {

    // 插入银行卡.
    var message = document.getElementsByClassName("tips-text");
    var pMessage = message[0].getElementsByTagName("p");

    pMessage[0].textContent = "请插入银行卡";

    //添加插卡事件 并使其可用
    var btn = document.getElementsByClassName("tips-btn");    
    var buttonCard = btn[0].getElementsByTagName("button");
    buttonCard[0].disabled = "";
    buttonCard[0].addEventListener('click', insertCard);
}
