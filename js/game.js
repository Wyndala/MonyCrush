/**
 * Created by FamMichael on 07.12.13.
 */
/*
Global Variables
 */

var GAME;

(function (window) {
    function Game() {
        this.initialize();
    }

    Game.prototype = new createjs.EventDispatcher();

    Game.prototype.emitters = [];
    Game.prototype.emitted = 0;

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
        GAME = this;

        //for (var i = 0; i < 6; i++) {
            var emitter = new Emitter(3);
            emitter.on('emitted', this.initiateGridDraw.bind(this));
            this.emitters[0] = emitter;
        //}
        this.dispatchEvent('emit');
    }

    Game.prototype.initiateGridDraw = function () {
        this.emitted++;

        if (this.emitted == this.emitters.length) {
            this.emitted = 0;

            this.grid.drawElements();
        }
    }

    Game.prototype.tick = function () {
        for (var i = 0; i < 6; i++) {
            if (!this.grid.getGridPosition(i)) {
                this.dispatchEvent('emit');
                i = 6;
            }
        }

        if (this.grid.isAllStopped()) {
            this.grid.handleThreeInARow();
        }

        this.stage.update();
    }

    Game.prototype.getWidth = function () {
        return 800;
    }

    Game.prototype.getHeight = function () {
        return 800;
    }

    Game.prototype.getGrid = function () {
        return this.grid;
    }

    window.Game = Game;
} (window));

function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


