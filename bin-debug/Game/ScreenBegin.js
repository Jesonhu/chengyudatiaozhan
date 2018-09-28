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
var Game;
(function (Game) {
    /**
     * 游戏开始界面类
     */
    var ScreenBegin = (function (_super) {
        __extends(ScreenBegin, _super);
        /**
         * @desc step1 加载皮肤
         * @desc step2 开始游戏按钮注册并监听点击
         * @desc step3 设置游戏按钮注册并监听点击
         * @desc step4 开始播放背景音乐
         */
        function ScreenBegin() {
            var _this = _super.call(this) || this;
            // step1
            _this.skinName = 'ScreenBeginSkin';
            return _this;
        }
        /**
         * 单例模式 Logic
         * 返回实例对象或者返回自己
         */
        ScreenBegin.Instance = function () {
            if (ScreenBegin.instance == null) {
                ScreenBegin.instance = new ScreenBegin();
            }
            return ScreenBegin.instance;
        };
        ScreenBegin.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        /**
         * 开始游戏按钮点击回调
         */
        ScreenBegin.prototype._onBtnBeginTap = function () {
            Game.SoundManager.Instance().PlayClick();
            // step1
            this.parent.addChild(Game.SceneLevels.Instance());
            this.parent.removeChild(this);
        };
        /**
         * 设置游戏按钮点击回调
         * @desc step1 声音管理(SoundManager单例对象执行PlayClick())
         */
        ScreenBegin.prototype._onBtnSettingTap = function () {
            Game.SoundManager.Instance().PlayClick();
            this.addChild(Game.GameSetting.Instance());
        };
        ScreenBegin.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // step2
            this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnBeginTap, this);
            // step3
            this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnSettingTap, this);
            // step4
            Game.SoundManager.Instance().PlayBGM();
        };
        return ScreenBegin;
    }(eui.Component));
    Game.ScreenBegin = ScreenBegin;
    __reflect(ScreenBegin.prototype, "Game.ScreenBegin", ["eui.UIComponent", "egret.DisplayObject"]);
})(Game || (Game = {}));
