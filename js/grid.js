/**
 * Created by FamMichael on 07.12.13.
 */
(function (window) {
    function Grid() {
        this.initialize();
    }

    Grid.prototype = new createjs.Container();

    Grid.prototype.gridArray = [];
    // initialize the object
    Grid.prototype.initialize = function () {
        this.setupGrid();
        this.drawGrid();

    }

    Grid.prototype.setupGrid = function () {
        var element = new createjs.Graphics();
        element.beginFill(createjs.Graphics.getRGB(150, 0, 50));
        element.drawCircle(0,0, 40, 40);
        var y = 0;
        for(var i=0; i<36;i++) {
            this.gridArray[i] = null;
            /*if (i > 0 && i % 6 == 0) {
                y++;
            }
            elementShape = new createjs.Shape(element);
            elementShape.snapToPixel = true;
            elementShape.x = i % 6 * 80 + 40;
            elementShape.y = y * 80 + 40;
            this.addChild(elementShape);
            */

        }
    }

    Grid.prototype.drawGrid = function () {
        var gw = 80, gh = 80;
        var verticalLine = new createjs.Graphics();
        verticalLine.beginFill(createjs.Graphics.getRGB(0, 0, 0));
        verticalLine.drawRect(0,0,1,gh*6);
        var horizontalLine = new createjs.Graphics();
        horizontalLine.beginFill(createjs.Graphics.getRGB(0, 0, 0));
        horizontalLine.drawRect(0,0,gw*6,1);

        var vs;
        // placing the vertical lines:
        // we're placing 1 more than requested
        // to have seamless scrolling later
        for ( var c = 0; c < 7; c++) {
            vs = new createjs.Shape(verticalLine);
            vs.snapToPixel = true;
            vs.x = c * gw;
            vs.y = 0;
            this.addChild(vs);

            hs = new createjs.Shape(horizontalLine);
            hs.snapToPixel = true;
            hs.x = 0;
            hs.y = c * gh;
            this.addChild(hs);
        }
     }

    window.Grid = Grid;
} (window));


