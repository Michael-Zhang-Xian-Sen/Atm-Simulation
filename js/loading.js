function loading(){
    // 显示动画
    var cardLoading = document.getElementsByClassName("card-loading");
    cardLoading[0].className = "card-loading";

    // 插入卡的动画/进度条
    var barline = document.getElementsByClassName("barline");
    var card = barline[0].getElementsByTagName("div");
    card[0].setAttribute("w", "50");

    animate();

    setTimeout(function () {
        card[0].setAttribute("w", "100");
        animate();
    }, 1000);
}

function animate() {
    $(".charts").each(function (i, item) {
        var a = parseInt($(item).attr("w"));
        $(item).animate({
            width: a + "%"
        }, 1000);
    });
}