

var li=document.querySelectorAll(".box li");
for (var i = 0; i < li.length; i++) {
    li[i].onmouseenter=function () {
        for (var j = 0; j < li.length; j++) {
            li[j].style.width="100px";
        }
        this.style.width="800px";
    };
    li[i].onmouseleave=function () {
        for (var j = 0; j < li.length; j++) {
            li[j].style.width="240px";
        }
    }
}


