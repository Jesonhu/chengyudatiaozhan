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
    var GameSetting = (function (_super) {
        __extends(GameSetting, _super);
        function GameSetting() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/eui_skins/GameSettingSkin.exml";
            _this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click_agree, _this);
            _this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click_sound, _this);
            _this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click_music, _this);
            //通过声音管理类来处理界面显示
            _this.update_buttonstate();
            return _this;
        }
        GameSetting.Instance = function () {
            if (GameSetting.instance == null) {
                GameSetting.instance = new GameSetting();
            }
            return GameSetting.instance;
        };
        GameSetting.prototype.click_agree = function () {
            Game.SoundManager.Instance().PlayClick();
            this.parent.removeChild(this);
        };
        GameSetting.prototype.click_sound = function () {
            Game.SoundManager.Instance().PlayClick();
            Game.SoundManager.Instance().IsSound = !Game.SoundManager.Instance().IsSound;
            this.update_buttonstate();
        };
        GameSetting.prototype.click_music = function () {
            Game.SoundManager.Instance().PlayClick();
            Game.SoundManager.Instance().IsMusic = !Game.SoundManager.Instance().IsMusic;
            this.update_buttonstate();
        };
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
//# sourceMappingURL=GameSetting.js.map