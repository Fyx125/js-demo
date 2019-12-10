(function (window, undefined) {
    var position = 'absolute';
    //记录上一次创建的食物
    var elements = [];

    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.backgroundColor = options.backgroundColor || 'green';
    }


    Food.prototype.render = function (map) {
        remove();
        var div = document.createElement('div');
        map.appendChild(div);

        elements.push(div);

        //随机生成位置
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

        div.style.position = position;
        div.style.backgroundColor = this.backgroundColor;
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
    };

//删除食物的点
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中元素
            elements.splice(i, 1);
        }
    }

    window.Food = Food;
})(window, undefined);


