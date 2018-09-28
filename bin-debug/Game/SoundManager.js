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
    var SoundManager = (function (_super) {
        __extends(SoundManager, _super);
        function SoundManager() {
            var _this = _super.call(this) || this;
            // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            _this.onAddToStage();
            return _this;
        }
        SoundManager.Instance = function () {
            if (SoundManager.instance == null) {
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        };
        SoundManager.prototype.onAddToStage = function (e) {
            if (e === void 0) { e = null; }
            this._click = new egret.Sound();
            this._click.load("resource/assets/sound/buttonclick.mp3");
            this._bgm = new egret.Sound();
            this._bgm.load("resource/assets/sound/Music.mp3");
            this._right = new egret.Sound();
            this._right.load("resource/assets/sound/right.mp3");
            this._wrong = new egret.Sound();
            this._wrong.load("resource/assets/sound/wrong.mp3");
            this._word = new egret.Sound();
            this._word.load("resource/assets/sound/type_word.mp3");
        };
        SoundManager.prototype.PlayBGM = function () {
            if (this.IsMusic) {
                this._bgm_channel = this._bgm.play(0, 0);
            }
        };
        SoundManager.prototype.StopBGM = function () {
            if (this._bgm_channel != null) {
                this._bgm_channel.stop();
            }
        };
        SoundManager.prototype.PlayClick = function () {
            if (this.IsSound) {
                this._click.play(0, 1);
            }
        };
        SoundManager.prototype.PlayRight = function () {
            if (this.IsSound) {
                this._right.play(0, 1);
            }
        };
        SoundManager.prototype.PlayWrong = function () {
            if (this.IsSound) {
                this._wrong.play(0, 1);
            }
        };
        SoundManager.prototype.PlayWord = function () {
            if (this.IsSound) {
                this._word.play(0, 1);
            }
        };
        Object.defineProperty(SoundManager.prototype, "IsMusic", {
            get: function () {
                var b = egret.localStorage.getItem("ismusic");
                if (b == null || b == "") {
                    return true;
                }
                else {
                    return b == "1";
                }
            },
            //音乐是否播放，保存设置
            set: function (value) {
                if (!value) {
                    egret.localStorage.setItem("ismusic", "0");
                    this.StopBGM();
                }
                else {
                    egret.localStorage.setItem("ismusic", "1");
                    this.PlayBGM();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "IsSound", {
            get: function () {
                var b = egret.localStorage.getItem("isSound");
                if (b == null || b == "") {
                    return true;
                }
                else {
                    return b == "1";
                }
            },
            //声效是否播放，保存设置
            set: function (value) {
                if (value) {
                    egret.localStorage.setItem("isSound", "1");
                }
                else {
                    egret.localStorage.setItem("isSound", "0");
                }
            },
            enumerable: true,
            configurable: true
        });
        return SoundManager;
    }(egret.DisplayObjectContainer));
    Game.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "Game.SoundManager");
})(Game || (Game = {}));
//# sourceMappingURL=SoundManager.js.map