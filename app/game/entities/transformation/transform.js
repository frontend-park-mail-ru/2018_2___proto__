"use strict";
exports.__esModule = true;
var Transform = /** @class */ (function () {
    function Transform(parent) {
        this.parent = parent;
        this.coordinates = new Array(0, 0, 0);
        this.children = new Array();
    }
    Transform.prototype.setParent = function (transform) {
        this.parent = transform;
    };
    Transform.prototype.getParent = function () {
        return this.parent;
    };
    Transform.prototype.addChild = function (transform) {
        this.children.push(transform);
    };
    Transform.prototype.getChildren = function () {
        return this.children;
    };
    return Transform;
}());
exports["default"] = Transform;
