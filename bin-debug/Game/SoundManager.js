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
     * 音乐播放控制
     */
    var SoundManager = (function (_super) {
        __extends(SoundManager, _super);
        function SoundManager() {
            var _this = _super.call(this) || this;
            _this._bgmLoaded = false;
            _this.onAddToStage();
            return _this;
        }
        SoundManager.Instance = function () {
            if (SoundManager.instance == null) {
                SoundManager.instance = new SoundManager();
            }
            return SoundManager.instance;
        };
        /**
         * 加载音乐资源
         */
        SoundManager.prototype.onAddToStage = function () {
            var baseMusicHost = 'resource/assets/sound';
            this._click = new egret.Sound();
            this._click.load(baseMusicHost + "/buttonclick.mp3");
            this._bgm = new egret.Sound();
            this._bgm.load(baseMusicHost + "/Music.mp3");
            this._right = new egret.Sound();
            this._right.load(baseMusicHost + "/right.mp3");
            this._wrong = new egret.Sound();
            this._wrong.load(baseMusicHost + "/wrong.mp3");
            this._word = new egret.Sound();
            this._word.load(baseMusicHost + "/type_word.mp3");
        };
        /**
         * 开启播放背景音乐
         */
        SoundManager.prototype.PlayBGM = function () {
            var _this = this;
            if (this.IsMusic) {
                this._bgm.addEventListener(egret.Event.COMPLETE, function () {
                    _this._bgmLoaded = true;
                    _this._bgm_channel = _this._bgm.play(0, 0);
                    console.log('背景音乐加载完成');
                }, this);
                if (this._bgmLoaded) {
                    this._bgm_channel = this._bgm.play(0, 0);
                }
            }
        };
        /**
         * 暂停播放
         */
        SoundManager.prototype.StopBGM = function () {
            if (this._bgm_channel !== null && this._bgmLoaded)
                this._bgm_channel.stop();
        };
        /**
         * 点击音效
         */
        SoundManager.prototype.PlayClick = function () {
            if (this.IsSound)
                this._click.play(0, 1);
        };
        /**
         * 猜对音效
         */
        SoundManager.prototype.PlayRight = function () {
            if (this.IsSound)
                this._right.play(0, 1);
        };
        /**
         * 猜错音效
         */
        SoundManager.prototype.PlayWrong = function () {
            if (this.IsSound)
                this._wrong.play(0, 1);
        };
        /**
         * 点击选择单字的音效
         */
        SoundManager.prototype.PlayWord = function () {
            if (this.IsSound)
                this._word.play(0, 1);
        };
        Object.defineProperty(SoundManager.prototype, "IsMusic", {
            /**
             * 背景音乐是否播放,保存设置;
             * 设置IsMusic拦截处理
             */
            get: function () {
                var b = egret.localStorage.getItem('isMusic'); // 获取本地存储中背景音乐的播放状态
                if (b == null || b == '') {
                    return true;
                }
                else {
                    return b == '1';
                }
            },
            /**
             * 背景音乐是否播放,保存设置;
             * 获取IsMusic拦截处理
             */
            set: function (value) {
                if (!value) {
                    console.log('Stop to Play BgMusic');
                    egret.localStorage.setItem('isMusic', '0');
                    this.StopBGM();
                }
                else {
                    console.log('Ok to Play BgMusic');
                    egret.localStorage.setItem('isMusic', '1');
                    this.PlayBGM();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "IsSound", {
            /**
             * 操作音效是否播放，保存设置
             * 设置IsSound拦截
             */
            get: function () {
                var b = egret.localStorage.getItem('isSound');
                if (b == null || b == '') {
                    return true;
                }
                else {
                    return b == '1';
                }
            },
            /**
             * 操作音效是否播放，保存设置
             */
            /**
             * 获取IsSound拦截
             */
            set: function (value) {
                if (!value) {
                    egret.localStorage.setItem('isSound', '0');
                }
                else {
                    egret.localStorage.setItem('isSound', '1');
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
