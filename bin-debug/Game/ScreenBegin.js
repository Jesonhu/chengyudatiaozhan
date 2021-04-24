var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var ScreenBegin = (function (_super) {
        __extends(ScreenBegin, _super);
        function ScreenBegin() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/eui_skins/ScreenBeginSkin.exml";
            //开始
            _this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_begin, _this);
            //设置
            _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
            //开始播放背景音乐
            Game.SoundManager.Instance().PlayBGM();
            return _this;
        }
        ScreenBegin.Instance = function () {
            if (ScreenBegin.instance == null)
                ScreenBegin.instance = new ScreenBegin();
            return ScreenBegin.instance;
        };
        /**
         * 设置界面
         */
        ScreenBegin.prototype.onclick_setting = function () {
            Game.SoundManager.Instance().PlayClick();
            this.addChild(Game.GameSetting.Instance());
        };
        /**
         * 游戏开始，先选关卡
         */
        ScreenBegin.prototype.onclick_begin = function () {
            Game.SoundManager.Instance().PlayClick();
            // 游戏开始前，先选择关卡界面
            this.parent.addChild(Game.SceneLevels.Instance());
            this.parent.removeChild(this);
        };
        ScreenBegin.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        ScreenBegin.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return ScreenBegin;
    }(eui.Component));
    Game.ScreenBegin = ScreenBegin;
    __reflect(ScreenBegin.prototype, "Game.ScreenBegin", ["eui.UIComponent", "egret.DisplayObject"]);
})(Game || (Game = {}));
//# sourceMappingURL=ScreenBegin.js.map