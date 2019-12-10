(function (window, undefined) {
    var that;

    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);

        //蛇开始移动
        runSnake();
        //控制蛇运动的方向
        bindKey();
    };

    //控制蛇运动的方向
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            //37--left 38--top 39--right 40--bottom
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false)
    }

    //蛇开始移动
    function runSnake() {
        var timeId = setInterval(function () {
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);

            //当蛇头到边界游戏结束
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            if (headX < 0 || headX >= maxX) {
                alert('Game Over!!!');
                clearInterval(timeId);
            }
            if (headY < 0 || headY >= maxY) {
                alert('Game Over!!!');
                clearInterval(timeId);
            }
        }.bind(that), 150);
    }

    window.Game = Game;
})(window, undefined);
