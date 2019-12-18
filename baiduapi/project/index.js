/**
 * 业务逻辑
 */
$(function () {
    var map = (new baiduMap()).init("mapContainer");
    var city = map.getCity();
    var area = map.getArea();
    var address = $('#enter_address');
    var cate_id = $('#cate_id');
    var goods = $('#enter_goods');
    var supply = $('#enter_supply');
    var phone = $('#enter_phone');
    var sign_status = $('#sign_status');
    var form_search = $('#form_search');
    var empty_info = $('#empty_info');
    var seller_list = $('#seller_list');
    var obj = '';
    var body = $("body");
    var title_form = $('.title_form');
    var prevIndex = 0;
    var round_counts = $('#round_counts');
    var circle;

    setScroll();
    $(window).resize(function () {
        setScroll();
    });
    function setScroll() {
        if ($(document.body).width() >= 1200) {
            body.css("overflow-x", "hidden");
        } else {
            body.css("overflow-x", "scroll");
        }
    }

    //左侧列表点击事件
    function sellerEvent() {
        var obj = $(this);
        var $id = obj.attr("index");
        var me = $("#" + $id + "");
        obj.addClass('seller_actived').siblings().removeClass('seller_actived');
//        $('.BMapLabel').css({'background': "#fff"});
//        $('.trigle').attr("src", "./static/map/label1.png");
//        me.parent('label').css({'background': "#FAF0E6"});
//        $('.trigle', me).attr("src", "./static/map/label2.png");
        if (prevIndex != 0 && "undefined" !== typeof map.items[prevIndex]) {
            map.items[prevIndex].setTop(false);
        }
        prevIndex = $id;
        map.items[$id].setTop(true);
    }

    title_form.on('submit', function (e) {
        searchInfo();
        return false;
    });

    //地图label点击事件
    function labelEvent() {
        var div = $(this.U).find("div").eq(0);
        var index = div.attr("id");
        var list_box = $('.list_box');
        var itemEl = $("#item_" + index);
        $('.BMapLabel').css({'background': "#fff"});
        div.parent('label').css({'background': "#FAF0E6"});
        $('.trigle').attr("src", "./static/map/label1.png");
        $('.trigle', div).attr("src", "./static/map/label2.png");
        itemEl.addClass('seller_actived').siblings().removeClass('seller_actived');
        if (prevIndex !== 0 && "undefined" !== typeof map.items[prevIndex]) {
            map.items[prevIndex].setTop(false);
        }
        prevIndex = index;
        map.items[index].setTop(true);
        list_box.animate({
            scrollTop: (list_box.scrollTop() + itemEl.position().top) - 45 + "px"
        }, 150, "linear");
    }

    empty_info.click(function () {
        address.val("");
        goods.val("");
        supply.val("");
        phone.val("");
    });

    //画圆
    function circleEvent(event) {
        var x = event.point.lng;
        var y = event.point.lat;
        circle = new BMap.Circle(new BMap.Point(x, y));
        var dot = new BMap.Point(new BMap.Point(x, y).lng, new BMap.Point(x, y).lat);
        circle.setStrokeWeight(2);
        circle.setRadius(3000);
        circle.setFillColor('purple');
        circle.setFillOpacity(0.2);
        map.mapDriver.clearOverlays(circle);
        map.mapDriver.addOverlay(circle);
        circle.addEventListener("click", getAttr(), true);
        circle.addEventListener('mouseover', function () {
            map.mapDriver.removeEventListener('click', circleEvent);
        });
        circle.addEventListener('mouseout', function () {
            map.mapDriver.addEventListener('click', circleEvent);
        });
        function getAttr(e) {
            var arry = [];
            for (var i = 0; i < map.points.length; i++) {
                var temp = new BMap.Point(map.points[i].lng, map.points[i].lat)
                if (map.mapDriver.getDistance(temp, dot) < 3000) {
                    arry.push(map.points[i].id)
                }
            }
            $('#seller_list').empty();
            round_counts.text(0)
            //圆圈内的海量点id数组
            if (arry.length > 0) {
                $.ajax({
                    type: "POST",
                    url: "?mod=supply&app=map&act=info",
                    data: {
                        id: arry
                    },
                    success: function (data) {
                        var resp = JSON.parse(data);
                        if (resp.success) {
                            var arry = [];
                            resp.data.map(function (item) {
                                arry.push(PK.parse($('#seller_tpl').text(), item))
                            })
                            $('#seller_list').append(arry.join(''));
                            $('.star').raty({readOnly: true});
                            $('.star').width('auto');
                            round_counts.text(resp.data.length);
                        }
                    }
                })
            }
        }
    }
    map.mapDriver.addEventListener("click", circleEvent);

    //绘画地图颜色板块
    for (var o in area) {
        if (false === area[o]) {
            continue;
        }
        map.drawBoundary(city + o, area[o]);
    }
    //海量点
    function starsFn() {
        $.ajax({
            type: "POST",
            url: "?mod=supply&app=map&act=point",
            data: {
                "map[zoom_threshold]": map.zoomThreshold,
                "map[zoom]": map.getZoom(),
                "map[area]": "",
                "map[address]": address.val(),
                "map[business]": goods.val(),
                "map[truename]": supply.val(),
                "map[username]": phone.val(),
                "map[sw]": '',
                "map[ne]": '',
                "map[cate_id]":cate_id.val()
            },
            dataType: "json",
            success: function (data) {
                map.drawStars(data, $('.list_box'));
            }
        });
    }
//    starsFn();
    map.setDataFromEnd(function (from) {
        var _this = this;
        //防止连续多次发送ajax
        for (var i = 0; i < _this.ajaxList.length; i++) {
            if (_this.ajaxList[i].abort) {
                _this.ajaxList[i].abort();
            }
        }
        _this.ajaxList = [];
        _this.ajaxList.push($.ajax({
            type: "POST",
            url: "?mod=supply&app=map&act=point",
            data: {
                "map[zoom_threshold]": _this.zoomThreshold,
                "map[zoom]": _this.mapDriver.getZoom(),
                "map[area]": "",
                "map[address]": address.val(),
                "map[business]": goods.val(),
                "map[truename]": supply.val(),
                "map[username]": phone.val(),
                "map[sign_status]":sign_status.val(),
//                    "map[sw]": _this.getCoordinate().getSouthWest(),
//                    "map[ne]": _this.getCoordinate().getNorthEast()
                "map[sw]": '',
                "map[ne]": '',
                "map[cate_id]":cate_id.val()
            },
            dataType: "json",
            success: function (resp) {
                map.drawStars(resp, $('.list_box'));
                if (!resp || resp.success == 0) {
                    //alert(resp.msg);
                }
                var data = _this.filterData(resp);
                var colorArea = $('.show_area_info ul').empty();
                //地图上方颜色小块
                var dom = [];
                //地图上需要新添加的label
                var addList = [];
                var round_count = 0;
                var tpl = $("#seller_tpl").html();
                //地图上需要删除的label
                var removeList = (_this.database.length ? _this.database.concat() : []);
                //显示右上角层级
//                map.showZoom();
                for (var i = 0; i < _this.areaOrder.length; i++) {
                    var o = _this.areaOrder[i];
                    if ("undefined" == typeof data[o]) {
                        continue;
                    }
                    round_count += data[o];
                    dom.push('<li area_name="' + o + '">', '<div class="area_color" style="background:' + _this.area[o] + '"></div>', '<span>' + o + ':</span>', '<span>' + data[o] + '</span>', '</li>');
                }
                if (dom.length <= 0) {
                    colorArea.append("<p class='no_result'>暂无搜索结果，请缩放或拖拽地图。</p>")
                } else {
                    colorArea.append(dom.join(""));
                }
                _this.setDom('seller_list', seller_list);
                _this.setSellerTpl(tpl);
                _this.setSellerEvent(sellerEvent);
                _this.setLabelTpl('<div class="label_box ellipsis"  id=<$=id$>><img src="static/h-ui/images/map_<$=supplier_type$>.png" /><img class="trigle" src="./static/map/label1.png" />&nbsp;&nbsp;<$=name$></div>');
                //地图label添加事件
//                _this.setLabelEvent(labelEvent);
                //地图缩放到阀值触发加载label事件
//                if (map.mapDriver.getZoom() >= 14) {
//                    for (var i = 0; i < resp.data.length; i++) {
//                        var match = false;
//                        for (var j = 0; j < _this.database.length; j++) {
//                            if (_this.database[j].id == resp.data[i].id) {
//                                match = true;
//                                removeList[j] = false;
//                                break;
//                            }
//                        }
//                        if (match === false) {
//                            addList.push(resp.data[i]);
//                        }
//                    }
//                    _this.database = resp.data.concat();
//                } else {
//                    _this.database = {};
//                }
                addList.map($.proxy(_this.addItem, _this));
                removeList.map($.proxy(_this.removeItem, _this));
                //地图上方颜色小块点击事件
                colorArea.find('li[area_name!=其他]').click(function () {
                    _this.centerAndZoom(_this.city + $(this).attr('area_name'), _this.mapDriver.getZoom());
                }).hover(function () {
                    var boundary = _this.boundaries[_this.city + $(this).attr('area_name')];
                    boundary && boundary.setFillOpacity(0.5);
                }, function () {
                    var boundary = _this.boundaries[_this.city + $(this).attr('area_name')];
                    boundary && boundary.setFillOpacity(_this.opacity);
                });
            }
        }));
    });

    function searchInfo() {
        map.mapDriver.clearOverlays(circle);
        $('#seller_list').empty();
        round_counts.text(0)
        map.mapDriver.pointCollection.clear();
        var val = address.val();
        if ('' == val) {
            map.getDataFromEnd();
        } else {
            var addressVal = map.city + val;
            map.localSearch(addressVal, function (searchResult) {
                var point = searchResult.getPoi(0).point;
                if (map.mapDriver.getZoom() >= map.zoomThreshold) {
                    map.centerAndZoom(point, 18);
                    map.getDataFromEnd();
                } else {
                    map.centerAndZoom(point,18);
                }
            });
        }
//        starsFn();
    }
    $('#seller_list').on('click', $('.seller'), function (e) {
        map.mapDriver.removeOverlay(map.mapDriver.jumpPoint);
        if ($(e.target).parents('.seller')) {
            $(e.target).parents('.seller').addClass('seller_actived').siblings().removeClass('seller_actived');
            var lng = $(e.target).parents('.seller').attr('lng');
            var lat = $(e.target).parents('.seller').attr('lat');
            var point = new BMap.Point(lng, lat);
            map.mapDriver.jumpPoint = new BMap.Marker(point);  // 创建标注
            map.mapDriver.addOverlay(map.mapDriver.jumpPoint);               // 将标注添加到地图中
            map.mapDriver.jumpPoint.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        }
    })
});

function edit(e, o) {
    obj = o;
    layerdialog.showiframeDialog('?mod=supply&app=map&act=edit&member_id=' + e, {title: '编辑供应商', width: '1000px', height: '750px'});
}

function load(e) {
    $(obj).parents('.seller_right').find('.seller_goods').html(e.company);
    console.log($(obj))
    $(obj).parents('.seller_right').find('.seller_man').html(e.truename);
    $(obj).parents('.seller_right').find('.seller_phone').html(e.mobile);
    $(obj).parents('.seller_right').find('.seller_ranges').html(e.business);
    var address = e.province + e.city + e.region + e.address;
    $(obj).parents('.seller_right').find('.seller_add').html(address);
    //显示编辑后的评分星星
    var id = ".star_" + e.id;
    $(id).raty({readOnly: true, score: e.avg, width: "100%"});
    $(obj).parents('.seller_right').find('span.avg').html(e.avg);
}

