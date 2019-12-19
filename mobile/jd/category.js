//获取左侧栏
var ct_cLeft = document.querySelector('.ct_cLeft');
//获取左侧滑动列表
var leftUl = ct_cLeft.querySelector('ul:first-of-type');
var lis = leftUl.querySelectorAll('li');
var leftHeight = ct_cLeft.offsetHeight;
var leftUlHeight = leftUl.offsetHeight;

//设置静止状态下的最大值和最小值
var maxTop = 0;
var minTop = leftHeight - leftUlHeight;
//设置滑动状态下的最大值和最小值
var maxBounceTop = maxTop + 100;
var minBounceTop = minTop - 100;

//添加左侧栏滑动事件
var startY = 0, moveY = 0, distanceY = 0;
var currentY = 0; //记录当前滑动的距离
leftUl.addEventListener('touchstart', function (e) {
    startY = e.targetTouches[0].clientY;
});
leftUl.addEventListener('touchmove', function (e) {
    moveY = e.targetTouches[0].clientY;
    distanceY = moveY - startY;
    //判断滑动是否在滑动区间内
    if (currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
        return;
    }
    leftUl.style.transition = 'none';
    leftUl.style.top = currentY + distanceY + 'px';
});
leftUl.addEventListener('touchend', function (e) {
    //判断滑动是否在静止和滑动的最大最小距离之间
    if (currentY + distanceY > maxTop) {
        currentY = maxTop;
        leftUl.style.transition = 'top .5s';
        leftUl.style.top = maxTop + 'px';
    } else if (currentY + distanceY < minTop) {
        currentY = minTop;
        leftUl.style.transition = 'top .5s';
        leftUl.style.top = minTop + 'px';
    } else {
        currentY += distanceY;
    }
});
//为每一个li加一个索引值
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
}

//使用zepto绑定移动端的tap事件
// $(leftUl).on('tap', function (e) {
//     for (var i = 0; i < lis.length; i++) {
//         lis[i].classList.remove('active');
//     }
//     var li = e.target.parentNode;
//     var liHeight = li.offsetHeight;
//     li.classList.add('active');
//
//     var index = li.index;
//     leftUl.style.transition = 'top .5s';
//     if (-index * liHeight < minTop) {
//         //只能偏移到minTop位置
//         leftUl.style.top = minTop + 'px';
//         currentY = minTop;
//     } else {
//         leftUl.style.top = -index * liHeight + 'px';
//         currentY = -index * liHeight;
//     }
// });

//使用fastclick绑定点击事件
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

leftUl.addEventListener('click', function (e) {
    for (var i = 0; i < lis.length; i++) {
        lis[i].classList.remove('active');
    }
    var li = e.target.parentNode;
    var liHeight = li.offsetHeight;
    li.classList.add('active');

    var index = li.index;
    leftUl.style.transition = 'top .5s';
    if (-index * liHeight < minTop) {
        //只能偏移到minTop位置
        leftUl.style.top = minTop + 'px';
        currentY = minTop;
    } else {
        leftUl.style.top = -index * liHeight + 'px';
        currentY = -index * liHeight;
    }
});

