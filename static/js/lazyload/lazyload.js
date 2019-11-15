

//原理；先将图片的真实地址存储在自定义属性上，所有的图片的src设置为一个默认的占位图片，页面滚动的时候判断这些图片是否已经达到了浏览器窗口可视范围之内，
// 达到了就将图片的src替换为之前设置的自定义属性上的真实地址

//将浏览器窗口可视范围内的图片加载出来
var img=document.querySelectorAll(".box img");
var curIndex=0;
function showImg() {
    //已经加载过得不再处理

    for (var i = curIndex; i < img.length; i++) {
        //页面滚动的距离
        var st=document.documentElement.scrollTop || document.body.scrollTop;
        if (img[i].offsetTop < (window.innerHeight+st-100)) {
            img[i].src=img[i].getAttribute("data-mySrc");
            curIndex=i;  //下一次加载从上次加载结束的位置开始
        }
    }
}
window.onload=function(){
    showImg();
};
window.onscroll=function () {
    showImg();
};