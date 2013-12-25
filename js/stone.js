/**
 * Created by FamMichael on 25.12.13.
 */
(function (window) {
    function Stone() {
        this.initialize();
    }

    Stone.prototype = new createjs.Bitmap();
    Stone.prototype._initialize = Stone.prototype.initialize;
    // initialize the object
    Stone.prototype.initialize = function () {
        this._initialize("assets/stone.png");
    }
    window.Stone = Stone;
} (window));