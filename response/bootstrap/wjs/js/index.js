$(function () {

    //初始化工具提示
    $('[data-toggle="tooltip"]').tooltip();

    //轮播图
    //获取所有item
    var items = $('.carousel-inner .item');
    //监听屏幕尺寸大小改变
    $(window).on('resize', function () {
        var width = $(window).width();
        if (width >= 768) {
            <!--非移动端-->
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data('largeImage');
                item.html($('<a href="javascript:void(0);" class="pcImg"></a>').css("background-image", "url('" + imgSrc + "')"));
            })
        } else {
            <!--移动端-->
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data('smallImage');
                item.html('<a href="javascript:void(0);" class="mobileImg"><img src="' + imgSrc + '" alt="..."></a>');
            })
        }
    }).trigger('resize');

    //添加移动端的滑动操作
    var startX, endX;
    var carousel_inner = $('.carousel-inner')[0];

    var carousel = $('.carousel');
    carousel_inner.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            carousel.carousel('prev');
        } else if (endX - startX < 0) {
            carousel.carousel('next');
        }
    });

    //添加导航栏的移动端滑动效果
    var ul = $('.wjs_product .nav-tabs');
    var lis = ul.find('li');
    var totalWidth = 0;
    lis.each(function (index, value) {
        totalWidth += $(value).innerWidth();
    });
    ul.width(totalWidth);

    //滑动插件
    var myScroll = new IScroll('.tabs_parent', {
        //设置水平滑动
        scrollX: true,
        scrollY: false
    })
});
