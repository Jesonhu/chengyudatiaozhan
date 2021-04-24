var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var components;
(function (components) {
    var Word = (function (_super) {
        __extends(Word, _super);
        function Word() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/components/WordSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_tap, _this);
            return _this;
        }
        Word.prototype.onclick_tap = function () {
            // console.log(this.lb_text.text);
            Game.SceneGame.Instance().onclick_word(this);
        };
        Word.prototype.setWordText = function (value) {
            this.lb_text.text = value;
        };
        Word.prototype.getWordText = function () {
            return this.lb_text.text;
        };
        Word.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Word.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return Word;
    }(eui.Component));
    components.Word = Word;
    __reflect(Word.prototype, "components.Word", ["eui.UIComponent", "egret.DisplayObject"]);
})(components || (components = {}));
//# sourceMappingURL=Word.js.map