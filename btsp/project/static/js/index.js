window.onload=function () {
    //轮播图
    var mySwiper = new Swiper ('.swiper-container', {
        speed:300,
        autoplay:{
            delay:3000,
            disableOnInteraction:false
        },
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable:true,
            bulletElement:'li',
            bulletClass:'swiper-pagination-custom',
            bulletActiveClass:'swiper-pagination-custom-active'
        }
    });
    $('#banner').mouseenter(function () {
        mySwiper.autoplay.stop();
    });
    $('#banner').mouseleave(function () {
        mySwiper.autoplay.start();
    });

    //产品中心分类切换
    $('#product li').click(function (event) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        $('.product .content .list').eq($(this).index()).addClass('content-active');
        $('.product .content .list').eq($(this).index()).siblings().removeClass('content-active');
    });

    $('#product li').mouseenter(function (event) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        $('.product .content .list').eq($(this).index()).addClass('content-active');
        $('.product .content .list').eq($(this).index()).siblings().removeClass('content-active');
    });
};


