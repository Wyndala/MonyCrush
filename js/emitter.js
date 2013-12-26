/**
 * Created by FamMichael on 25.12.13.
 */
(function (window) {
    function Emitter(x) {
        this.initialize(x);
    }

    Emitter.prototype = new createjs.EventDispatcher();
    // initialize the object
    Emitter.prototype.initialize = function (x) {
        this.x = x;
        GAME.on('emit', this.emit.bind(this));
    }

    Emitter.prototype.emit = function () {


        var grid = GAME.getGrid();
        if (grid.isPositionFree(this.x)) {
            console.log('emit ' + this.x);
            var stone = new Stone(this.x);
            stone.snapToPixel = true;

            var coordinates = grid.getCoordinatesFromIndex(this.x);

            stone.x = coordinates.x;
            stone.y = coordinates.y;

            grid.setGridPosition(this.x, stone);
        }
        this.dispatchEvent('emitted');
    }
    window.Emitter = Emitter;
} (window));