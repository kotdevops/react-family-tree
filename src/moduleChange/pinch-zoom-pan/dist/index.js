"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helpers_1 = require("./helpers");
var styles_1 = require("./styles");
var types_1 = require("./types");
var PinchZoomPan = /** @class */ (function (_super) {
    __extends(PinchZoomPan, _super);
    function PinchZoomPan(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            transform: { x: 0, y: 0, z: 0.7 },
            action: types_1.pzpAction.None,
        };
        _this.onTouchStart = function (event) {
            event.preventDefault();
            if (typeof TouchEvent !== 'undefined' && // IE & EDGE doesn't have TouchEvent
                event instanceof TouchEvent &&
                event.touches.length === 2) {
                _this.setState({ action: types_1.pzpAction.Pinching });
                _this.currentZ = _this.state.transform.z;
                _this.currentR = helpers_1.getTouchesRange(event);
            }
            else {
                _this.startMoving(event);
            }
        };
        _this.onTouchEnd = function (event) {
            if (_this.state.action === types_1.pzpAction.Pinching &&
                typeof TouchEvent !== 'undefined' && // IE & EDGE doesn't have TouchEvent
                event instanceof TouchEvent &&
                event.touches.length === 1) {
                _this.startMoving(event);
            }
            else {
                _this.setState({ action: types_1.pzpAction.None });
            }
        };
        _this.onTouchMove = function (event) {
            event.stopImmediatePropagation();
            event.preventDefault();
            var action = _this.state.action;
            if (action === types_1.pzpAction.Moving)
                _this.move(event);
            else if (action === types_1.pzpAction.Pinching)
                _this.pinch(event);
        };
        _this.onWheel = function (event) {
            if (!_this.props.captureWheel && !event.altKey)
                return;
            event.preventDefault();
            event.stopPropagation();
            var delta = helpers_1.getWheelDelta(event) * -1;
            var z = helpers_1.limitZoom(_this.state.transform.z + delta, _this.props.min, _this.props.max);
            var _a = _this.getPositionByPoint(z, event.pageX, event.pageY), x = _a.x, y = _a.y;
            _this.setState({ transform: _this.updateTransform({ x: x, y: y, z: z }) });
        };
        _this.setRoot = function (el) {
            return _this.root = el;
        };
        var touch = helpers_1.isTouch();
        _this.eventsMap = [
            { name: touch ? 'touchstart' : 'mousedown', handler: _this.onTouchStart },
            { name: touch ? 'touchmove' : 'mousemove', handler: _this.onTouchMove },
            { name: touch ? 'touchend' : 'mouseup', handler: _this.onTouchEnd },
            { name: touch ? 'touchleave' : 'mouseleave', handler: _this.onTouchEnd },
            { name: 'touchcancel', handler: _this.onTouchEnd },
            { name: 'wheel', handler: _this.onWheel },
        ];
        return _this;
    }
    PinchZoomPan.prototype.componentDidMount = function () {
        this.subscribe();
        this.init();
    };
    PinchZoomPan.prototype.componentWillUnmount = function () {
        this.unsubscribe();
    };
    PinchZoomPan.prototype.subscribe = function () {
        var _this = this;
        this.eventsMap.forEach(function (event) {
            _this.root.addEventListener(event.name, event.handler);
        });
    };
    PinchZoomPan.prototype.unsubscribe = function () {
        var _this = this;
        this.eventsMap.forEach(function (event) {
            _this.root.removeEventListener(event.name, event.handler);
        });
    };
    PinchZoomPan.prototype.init = function () {
        var rootRect = this.root.getBoundingClientRect();
        var x = rootRect.width / 2;
        var y = rootRect.height / 2;
        this.setState({ transform: this.updateTransform({ x: x, y: y }) });
    };
    PinchZoomPan.prototype.updateTransform = function (transform) {
        return __assign({}, this.state.transform, transform);
    };
    PinchZoomPan.prototype.updateCurrentPos = function (X, Y) {
        this.currentX = X;
        this.currentY = Y;
    };
    PinchZoomPan.prototype.getPositionByPoint = function (zoom, X, Y) {
        var _a = this.state.transform, x = _a.x, y = _a.y, z = _a.z;
        var _b = this.root.getBoundingClientRect(), left = _b.left, top = _b.top;
        var offsetX = (X - left - window.pageXOffset) - x;
        var offsetY = (Y - top - window.pageYOffset) - y;
        var ratio = zoom / z;
        return {
            x: x - (offsetX * ratio - offsetX),
            y: y - (offsetY * ratio - offsetY),
        };
    };
    PinchZoomPan.prototype.startMoving = function (event) {
        this.setState({ action: types_1.pzpAction.Moving });
        var _a = helpers_1.getClientXY(event), X = _a.X, Y = _a.Y;
        this.updateCurrentPos(X, Y);
    };
    PinchZoomPan.prototype.move = function (event) {
        var _a = helpers_1.getClientXY(event), X = _a.X, Y = _a.Y;
        var x = this.state.transform.x - (this.currentX - X);
        var y = this.state.transform.y - (this.currentY - Y);
        this.setState({ transform: this.updateTransform({ x: x, y: y }) });
        this.updateCurrentPos(X, Y);
    };
    PinchZoomPan.prototype.pinch = function (event) {
        // webkit
        var scale = event.scale;
        var pageX = event.pageX;
        var pageY = event.pageY;
        // others
        if (scale === undefined || pageX === undefined || pageY === undefined) {
            scale = helpers_1.getTouchesRange(event) / this.currentR;
            var _a = helpers_1.getMidXY(event), mX = _a.mX, mY = _a.mY;
            pageX = mX;
            pageY = mY;
        }
        var z = helpers_1.limitZoom(this.currentZ * scale, this.props.min, this.props.max);
        var _b = this.getPositionByPoint(z, pageX, pageY), x = _b.x, y = _b.y;
        this.setState({ transform: this.updateTransform({ x: x, y: y, z: z }) });
    };
    // private setRefPoint = (el: HTMLElement | null) =>
    //   this.refPoint = el as HTMLElement;
    // private setCanvas = (el: HTMLElement | null) =>
    //   this.canvas = el as HTMLElement;
    PinchZoomPan.prototype.render = function () {
        var _a = this.state.transform, x = _a.x, y = _a.y, z = _a.z;
        var transform = "translate(" + x + "px, " + y + "px) scale(" + z + ")";
        return (React.createElement("div", { ref: this.setRoot, className: this.props.className, style: __assign({}, styles_1.ROOT_STYLES, this.props.style) },
            React.createElement("div", { style: __assign({}, styles_1.POINT_STYLES, { transform: transform }) },
                React.createElement("div", { style: styles_1.CANVAS_STYLES }, this.props.children)),
            this.props.debug && (React.createElement("div", { style: styles_1.DEBUG_STYLES }, JSON.stringify(this.state, null, '  ')))));
    };
    PinchZoomPan.defaultProps = {
        min: 0.1,
        max: 3.5,
    };
    return PinchZoomPan;
}(React.Component));
exports.default = PinchZoomPan;
