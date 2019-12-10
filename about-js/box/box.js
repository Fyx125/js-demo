function Box(parent, options) {
    options = options || {};
    this.backgroundColor = options.backgroundColor || '#f00';
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;

    //创建div
    this.div = document.createElement('div');
    parent.appendChild(this.div);
    this.parent = parent;

    this.init();
}

//初始化div样式
Box.prototype.init = function () {
    var div = this.div;
    div.style.backgroundColor = this.backgroundColor;
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.position = 'absolute';
};

//随机生成位置
Box.prototype.random = function () {
    var x = Tools.getRandom(0, this.parent.offsetWidth / this.width - 1) * this.width;
    var y = Tools.getRandom(0, this.parent.offsetHeight / this.height - 1) * this.height;
    this.div.style.left = x + 'px';
    this.div.style.top = y + 'px';
};
