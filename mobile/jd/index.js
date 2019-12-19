window.onload = function () {
    //秒杀倒计时
    timeBack();
    //轮播图
    bannerEffect();
};

// 倒计时
function timeBack() {
    var spans = document.querySelector('.jd_sk_time').querySelectorAll('span');
    var totalTime = 2 * 60 * 60;
    var timeId = setInterval(function () {
        totalTime--;
        if (totalTime < 0) {
            clearInterval(timeId);
            return;
        }
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = totalTime % 60;

        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        spans[0].innerText = hour;
        spans[1].innerText = minute;
        spans[2].innerText = second;
    }, 1000)
}

//轮播图
function bannerEffect() {
    var banner = document.querySelector('.jd_banner');
    var imgBox = banner.querySelector('ul:first-of-type');
    var first = imgBox.querySelector('li:first-of-type');
    var last = imgBox.querySelector('li:last-of-type');
    var index = 1;

    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    var lis = imgBox.querySelectorAll('li');
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + 'px';
    for (var i = 0; i < count; i++) {
        lis[i].style.width = bannerWidth + 'px';
    }
    imgBox.style.left = -bannerWidth + 'px';

    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count * bannerWidth + 'px';
        for (var i = 0; i < count; i++) {
            lis[i].style.width = bannerWidth + 'px';
        }
        imgBox.style.left = -index * bannerWidth + 'px';
    };

    //实现点标记
    var setIndex = function (index) {
        var bannerIndexs = banner.querySelector('ul:last-of-type').querySelectorAll('li');
        for (var i = 0; i < bannerIndexs.length; i++) {
            bannerIndexs[i].classList.remove('active');
        }
        bannerIndexs[index-1].classList.add('active');
    };

    //自动轮播
    var timeId;
    var startTime = function () {
        timeId = setInterval(function () {
            index++;
            imgBox.style.transition = 'left 0.3s ease-in-out';
            imgBox.style.left = (-index * bannerWidth) + 'px';
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    imgBox.style.transition = 'none';
                    imgBox.style.left = (-index * bannerWidth) + 'px';
                }
            }, 500)
        }, 3000);
    };
    startTime();

    //手动轮播
    var startX, moveX, distanceX;
    var isEnd = true; //标记过渡效果是否完成
    // 触摸事件开始
    imgBox.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX;
        clearInterval(timeId);
        imgBox.style.transition = 'none';
        // console.log(startX);
    });
    //滑动过程
    imgBox.addEventListener('touchmove', function (e) {
        if (isEnd == true) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            imgBox.style.transition = 'none';
            imgBox.style.left = distanceX - bannerWidth * index + 'px';
        }
    });
    //滑动结束
    imgBox.addEventListener('touchend', function (e) {
        isEnd = false;
        //判断滑动距离是否超过图片1/3的大小
        if (Math.abs(distanceX) > bannerWidth / 3) {
            //判断滑动的方向
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            imgBox.style.transition = 'left 0.3s ease-in-out';
            imgBox.style.left = (-index * bannerWidth) + 'px';
        } else if (Math.abs(distanceX) > 0) {
            //回弹
            imgBox.style.transition = 'left 0.3s ease-in-out';
            imgBox.style.left = (-index * bannerWidth) + 'px';
        }
        //将上一次滑动后的数据归0
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

    //过度效果执行完毕 执行
    imgBox.addEventListener('webkitTransitionEnd', function () {
        //到最后一张（count-1）回到索引index=1
        //到第一张(index=0)回到索引count-2
        if (index == count - 1) {
            index = 1;
            imgBox.style.transition = 'none';
            imgBox.style.left = (-index * bannerWidth) + 'px';
        } else if (index == 0) {
            index = count - 2;
            imgBox.style.transition = 'none';
            imgBox.style.left = (-index * bannerWidth) + 'px';
        }
        //设置点标记
        setIndex(index);
        //滑动一次后不能马上滑动
        setTimeout(function () {
            isEnd = true;
            clearInterval(timeId);
            //重新开启定时器
            startTime();
        },500);
    })
}
