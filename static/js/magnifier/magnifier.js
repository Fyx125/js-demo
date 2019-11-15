

var box=document.querySelector(".box");
var show=document.querySelector(".show");
var move=document.querySelector(".move");
var zoom=document.querySelector(".zoom");
var big=document.querySelector(".big");

//获取show宽高
var showWidth=show.offsetWidth;
var showHeight=show.offsetHeight;

var moveWidth;
var moveHeight;

//比例
var pixW;
var pixH;
//鼠标移入事件
show.onmouseenter=function(){
    //滑块和放大区域显示
    zoom.style.display="block";
    move.style.display="block";
    //获取滑块宽高
    moveWidth=move.offsetWidth;
    moveHeight=move.offsetHeight;
    //获取zoom区域宽高
    var zoomWidth=zoom.offsetWidth;
    var zoomHeight=zoom.offsetHeight;
    //右边放大区域的宽高比例
    pixW=moveWidth/showWidth;
    pixH=moveHeight/showHeight;
    //设置右边大图（zoom）的尺寸
    big.style.width=zoomWidth/pixW+"px";
    big.style.height=zoomHeight/pixH+"px";
};

//鼠标移出事件
show.onmouseleave=function(){
    //滑块和放大区域隐藏
    zoom.style.display="none";
    move.style.display="none";
};

//show里面的鼠标移动事件
show.onmousemove=function (event) {
    var event=event || window.event;
    //鼠标相对于浏览器左上角的坐标
    var clX=event.clientX;
    var clY=event.clientY;
    // 获取box区域相对于浏览器左上角的距离
    var clX2=box.offsetLeft;
    var clY2=box.offsetTop;
    //鼠标在show区域里面的偏移
    var lt=clX-clX2;
    var tp=clY-clY2;

    //设置move位置
    //设置move的边缘
    if(lt<=(moveWidth/2)){  //左右处理
        move.style.left="0";
    }else if(lt>=(showWidth-moveWidth/2)){
        move.style.left=showWidth-moveWidth+"px";
    }else{
        move.style.left=lt-(moveWidth/2)+"px";
    }
    if(tp<=(moveHeight/2)){  //上下处理
        move.style.top="0";
    }else if(tp>=(showHeight-moveHeight/2)){
        move.style.top=showHeight-moveHeight+"px";
    }else{
        move.style.top=tp-(moveHeight/2)+"px";
    }
    //设置zoom显示区域
    big.style.left=-parseFloat(move.style.left)/pixW+"px";
    big.style.top=-parseFloat(move.style.top)/pixH+"px";
};

