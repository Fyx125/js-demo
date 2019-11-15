
//每个item的宽度
const colWidth=200;
//计算一行可以容纳多少个item
var colNum=Math.floor(window.innerWidth/colWidth);
//item之间的间隙大小
var clearance=Math.floor((window.innerWidth-colNum*colWidth)/(colNum+1));
// 存储高度的数组（每一次将高度存储起来）
var saveH=[];
function creatDiv() {
    var doc=document.createDocumentFragment();
    for (var i = 0; i < 100; i++) {
        var div=document.createElement("div");
        div.innerHTML=i+1;
        div.className="item";
        //随机高度
        var h=Math.floor(Math.random()*100)+200;
        //随机背景颜色
        var r=Math.floor(Math.random()*256);
        var g=Math.floor(Math.random()*256);
        var b=Math.floor(Math.random()*256);
        div.style.backgroundColor=`rgb(${r},${g},${b})`;
        div.style.height=h+"px";
        div.style.lineHeight=h+"px";
        div.style.width=colWidth+"px";
        doc.appendChild(div);
    }
    document.body.appendChild(doc);

    //实现瀑布流
    show();
}
creatDiv();

/**
 * 实现瀑布流
 */
function show() {
    var item=document.querySelectorAll(".item");
    //遍历所有的item
    for (var i = 0; i < item.length; i++) {
        if (i<colNum) {       //第一行
            item[i].style.top=clearance+"px";
            item[i].style.left=clearance*(i+1)+colWidth*i+"px";
            //存储高度
            saveH.push(clearance+item[i].offsetHeight);
        }else{   //找到高度最小的那一列  之后的行
            var index=getMin(saveH);
            item[i].style.top=clearance+saveH[index]+"px";
            item[i].style.left=clearance*(index+1)+colWidth*index+"px";
            //修改存储高度的数组
            saveH[index]=saveH[index]+item[i].offsetHeight+clearance;
        }
    }
}

/**
 * 获取数组里面的最小值
 * @param arr
 */
function getMin(arr){
    var min=arr[0];
    var curIndex=0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min=arr[i];
            curIndex=i;
        }
    }
    return curIndex;
}

/**
 * 页面窗口大小改变时重新布局
 */
window.onresize=function () {
    //计算一行可以容纳多少个item
    colNum=Math.floor(window.innerWidth/colWidth);
    //item之间的间隙大小
    clearance=Math.floor((window.innerWidth-colNum*colWidth)/(colNum+1));
    // 存储高度的数组（每一次将高度存储起来）
    saveH=[];
    //重新布局
    show();
};