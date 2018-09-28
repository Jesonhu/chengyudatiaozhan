var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var components;
(function (components) {
    var LevelIcon = (function (_super) {
        __extends(LevelIcon, _super);
        function LevelIcon() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/components/LevelIconSkin.exml";
            return _this;
        }
        Object.defineProperty(LevelIcon.prototype, "Level", {
            get: function () {
                return parseInt(this.lb_level.text);
            },
            set: function (value) {
                this.lb_level.text = value.toString();
            },
            enumerable: true,
            configurable: true
        });
        LevelIcon.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        LevelIcon.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return LevelIcon;
    }(eui.Button));
    components.LevelIcon = LevelIcon;
    __reflect(LevelIcon.prototype, "components.LevelIcon", ["eui.UIComponent", "egret.DisplayObject"]);
})(components || (components = {}));
//# sourceMappingURL=LevelIcon.js.map