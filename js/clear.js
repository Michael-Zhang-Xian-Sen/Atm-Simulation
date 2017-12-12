function clearMsg(){
    var tipsContainer = document.getElementsByClassName("tips-text");
    while(tipsContainer[0].hasChildNodes()){
        tipsContainer[0].removeChild(tipsContainer[0].childNodes[0]);
    }
}

function clearTipsBtn(){
    var tipsBtn = document.getElementsByClassName("tips-btn");
    while(tipsBtn[0].hasChildNodes()){
        tipsBtn[0].removeChild(tipsBtn[0].childNodes[0]);
    }
}