window.onload = function () {
    var atmServe1 = document.getElementsByClassName("atm-serve-1");
    var drawLink = atmServe1[0].getElementsByTagName("a")[0];

    // 给银行卡取款绑定事件
    drawLink.addEventListener('click', toInsertCard);
}

function toInsertCard(){
    document.location = "./check.html";
}
