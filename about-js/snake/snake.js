(function (window, undefined) {
    var position = 'absolute';
    //记录上一次创建的蛇
    var elements = [];

    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        //行进方向
        this.direction = options.direction || 'right';
        //蛇的长度
        this.body = [
            {x: 3, y: 2, color: 'red'},
            {x: 2, y: 2, color: 'blue'},
            {x: 1, y: 2, color: 'blue'}
        ];

    }

    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

    Snake.prototype.render = function (map) {
        //删除之前的蛇
        remove();

        for (var i = 0, len = this.body.length; i < len; i++) {
            var obj = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);

            elements.push(div);

            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.top = obj.y * this.height + 'px';
            div.style.left = obj.x * this.width + 'px';
            div.style.backgroundColor = obj.color;
        }
    };

    //蛇的移动
    Snake.prototype.move = function (food, map) {
        //控制蛇的身体（当前一节向上一节所在位置移动）
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        //控制蛇头
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        //判断蛇头是否与食物坐标重合
        //当蛇遇到食物（吃掉）
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            //让蛇的身体增加一节
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //重新生成食物
            food.render(map);
        }
    };

    window.Snake = Snake;
})(window, undefined);
