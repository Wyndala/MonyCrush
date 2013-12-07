/**
 * Created by FamMichael on 07.12.13.
 */
(function (window) {
    function Game() {
        this.initialize();
    }

    Game.prototype.gridArray = [];
    // initialize the object
    Game.prototype.initialize = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.getWidth();
        canvas.height = this.getHeight();
        document.body.appendChild(canvas);

        this.stage = new createjs.Stage(canvas);

        createjs.Ticker.setFPS(5);
        createjs.Ticker.addEventListener('tick', this.tick.bind(this));

        this.grid = new Grid();
        this.stage.addChild(this.grid);
    }

    Game.prototype.tick = function () {
        this.stage.update();
    }

    Game.prototype.getWidth = function () {
        return 800;
    }

    Game.prototype.getHeight = function () {
        return 800;
    }

    window.Game = Game;
} (window));


