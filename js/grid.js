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

    Grid.prototype.drawElements = function() {
        for (var i=0;i<6; i++) {
            var element = this.getGridPosition(i);
            if (element && this.getChildIndex(element) < 0) {
                this.addChild(element)
            }
        }
    }

    Grid.prototype.isAllStopped = function() {
        for (var i=0;i<this.gridArray.length; i++) {
            if (this.gridArray[i]) {
                if (!this.gridArray[i].stopped) {
                    return false;
                }
            }
        }

        return true;
    }

    Grid.prototype.handleThreeInARow = function() {
        var oldType = -1;
        var arrayToRemove = [];
        var tempArray = [];
        for (var i=0;i<this.gridArray.length; i++) {
            var element = this.getGridPosition(i);
            if (element) {
                if (element.type != oldType) {
                    oldType = element.type;

                    if (tempArray.length > 2) {
                        arrayToRemove.push(tempArray);
                    }
                    tempArray = [];
                }

                tempArray.push(element);
            }
        }

        for (var j=0; j<arrayToRemove.length; j++) {
            var elements = arrayToRemove[j];
            this.removeElementsFromGrid(elements);
        }
    }

    Grid.prototype.moveElementInGrid = function(srcIndex, targetIndex) {
        var element = this.gridArray[srcIndex];
        this.setGridPosition(targetIndex, element);
        this.setGridPosition(srcIndex, null);
    }

    Grid.prototype.removeElementsFromGrid = function(elements) {
        for (var i=0; i<elements.length; i++) {
            this.removeElementFromGrid(elements[i].index);
        }
    }

    Grid.prototype.removeElementFromGrid = function(index) {
        var element = this.gridArray[index];
        this.gridArray[index] = null;
        this.removeChild(element);
    }

    Grid.prototype.getGridPosition = function(index) {
        return this.gridArray[index];
    }

    Grid.prototype.setGridPosition = function(index, element) {
        this.gridArray[index] = element;
    }

    Grid.prototype.isPositionFree = function(index) {
        if (this.gridArray[index] || index >= this.gridArray.length) {
            return false;
        }

        return true;
    }

    Grid.prototype.getNextFreePosition = function(index) {
        if (!this.getGridPosition(index) && index > -1 && index < 36) {
            return index;
        } else if (!this.getGridPosition(index - 1) && index > 0 && index < 36
                    && !this.getGridPosition(index - 7)) {
            return (index - 1);
        } else if (!this.getGridPosition(index + 1) && index > -1 && index < 35
                    && !this.getGridPosition(index - 5)) {
            return (index + 1);
        }

        return -1;
    }

    Grid.prototype.getCoordinatesFromIndex = function(index) {
        var coordinates = {x: 0, y: 0};
        coordinates.x = (index % 6 ) * 80 + 20;
        coordinates.y = Math.floor(index / 6) * 80 + 20;

        return coordinates;
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


