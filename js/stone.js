/**
 * Created by FamMichael on 25.12.13.
 */
(function (window) {
    function Stone(index) {
        this.initialize(index);
    }

    Stone.prototype = new createjs.Bitmap();
    Stone.prototype._initialize = Stone.prototype.initialize;
    // initialize the object
    Stone.prototype.initialize = function (index) {
        this.type = this.calculateType();
        var img = this.getTypeImage(this.type);

        this._initialize(img);
        this.stopped = true;
        this.on('tick', this.tick);
        this.on('click', this.remove);
        this.index = index;
    }

    Stone.prototype.tick = function () {
        var grid = GAME.getGrid();
        var newIndex = grid.getNextFreePosition(this.index + 6);

        if (newIndex > -1) {
            this.stopped = false;
            var coordinates = grid.getCoordinatesFromIndex(newIndex);
            this.setCoordinates(coordinates);
            grid.moveElementInGrid(this.index, newIndex);
            this.index = newIndex;
        } else {
            this.stopped = true;
        }
    }

    Stone.prototype.remove = function () {
        var grid = GAME.getGrid();
        grid.removeElementFromGrid(this.index);
    }

    Stone.prototype.setCoordinates = function (coordinates) {
        this.x = coordinates.x;
        this.y = coordinates.y;
    }

    Stone.prototype.calculateType = function () {
        var type = rand(0,3);
        return type;
    }

    Stone.prototype.getTypeImage = function (type) {
        switch (type) {
            case 0: return 'assets/chrome.jpg';
            case 1: return 'assets/ie.jpg';
            case 2: return 'assets/firefox.jpg';
            case 3: return 'assets/safari.jpg';

        }
    }

    window.Stone = Stone;
} (window));