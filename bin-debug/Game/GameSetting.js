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
     * 游戏控制
     */
    var GameSetting = (function (_super) {
        __extends(GameSetting, _super);
        function GameSetting() {
            var _this = _super.call(this) || this;
            // step1
            _this.skinName = 'GameSettingSkin';
            // step2
            _this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._onBtnAgreeTap, _this);
            _this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._onBtnSoundTap, _this);
            _this.img_sound_disable.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._onBtnSoundTap, _this);
            _this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._onBtnMusicTap, _this);
            _this.img_music_disable.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._onBtnMusicTap, _this);
            // step3
            _this.update_buttonstate();
            return _this;
        }
        /**
         * 返回单例
         */
        GameSetting.Instance = function () {
            if (GameSetting.instance == null) {
                GameSetting.instance = new GameSetting();
            }
            return GameSetting.instance;
        };
        /**
         * 同意按钮（btn_agree）点击回调--相当于关闭界面
         */
        GameSetting.prototype._onBtnAgreeTap = function () {
            Game.SoundManager.Instance().PlayClick();
            this.parent.removeChild(this);
        };
        /**
         * 背景音乐按钮点击回调
         */
        GameSetting.prototype._onBtnMusicTap = function () {
            Game.SoundManager.Instance().PlayClick();
            Game.SoundManager.Instance().IsMusic = !Game.SoundManager.Instance().IsMusic;
            console.log("Now IsMusic: " + Game.SoundManager.Instance().IsMusic);
            this.update_buttonstate();
            // console.log('click left music btn');
        };
        /**
         * 游戏音效按钮点击回调
         */
        GameSetting.prototype._onBtnSoundTap = function () {
            Game.SoundManager.Instance().PlayClick();
            Game.SoundManager.Instance().IsSound = !Game.SoundManager.Instance().IsSound;
            this.update_buttonstate();
            console.log('click right sound btn');
        };
        /**
         * 通过声音管理类来处理界面显示
         */
        GameSetting.prototype.update_buttonstate = function () {
            this.img_music_disable.visible = !Game.SoundManager.Instance().IsMusic;
            this.img_sound_disable.visible = !Game.SoundManager.Instance().IsSound;
        };
        GameSetting.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        GameSetting.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return GameSetting;
    }(eui.Component));
    Game.GameSetting = GameSetting;
    __reflect(GameSetting.prototype, "Game.GameSetting", ["eui.UIComponent", "egret.DisplayObject"]);
})(Game || (Game = {}));
