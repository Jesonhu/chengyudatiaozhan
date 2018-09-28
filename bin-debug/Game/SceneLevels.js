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
     * 关卡选择舞台界面
     */
    var SceneLevels = (function (_super) {
        __extends(SceneLevels, _super);
        function SceneLevels() {
            var _this = _super.call(this) || this;
            _this.set_level = 0;
            _this.LevelIcons = [];
            _this.LEVEL_MAX = 100;
            _this.row = 20;
            _this.col = 10;
            _this.spanX = 720 / _this.col; // 计算行x间隔
            _this.spanY = 1136 / _this.row; // 计算y间距
            _this.skinName = "resource/eui_skins/SceneLevelsSkin.exml";
            //返回按钮
            _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
            //设置
            _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
            return _this;
        }
        /**
         * 返回单例或者类实例对象
         */
        SceneLevels.Instance = function () {
            if (SceneLevels.instance == null) {
                SceneLevels.instance = new SceneLevels();
            }
            return SceneLevels.instance;
        };
        /**
         * createMapUI -- 创建地图背景 Logic && UI
         */
        SceneLevels.prototype.createMapBg = function () {
            this.group = new eui.Group(); // 地图背景
            this.group.width = 720;
            this.group.height = this.spanY * this.LEVEL_MAX; // 计算出最大高度
            console.log('group height', this.group.height);
            var BgImgHei = this.group.height / 1136; // 
            // 填充背景
            for (var i = 0, groupLen = this.group.height / 1136; i < groupLen; i++) {
                var img = new eui.Image();
                img.source = RES.getRes('GameBG2_jpg');
                img.y = i * 1136;
                img.touchEnabled = false;
                this.group_levels.addChildAt(img, 0);
            }
        };
        /**
         * 以正弦曲线绘制关卡图标的路径
         * @desc icon不能设置为全局的
         */
        SceneLevels.prototype.createMapRoute = function () {
            var milestone = Game.LevelDataManager.Instance().Milestone;
            this.set_level = milestone;
            for (var i = 0; i < this.LEVEL_MAX; i++) {
                var icon = new components.LevelIcon();
                icon.Level = i + 1;
                icon.y = this.spanY * i / 2;
                icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + this.group.width / 2;
                icon.y += this.spanY * i / 2;
                icon.y = this.group.height - icon.y - this.spanY;
                this.group.addChild(icon);
                icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
                // 依据进度设置关卡显示
                icon.enabled = i < milestone;
                // 保存到一个列表中
                this.LevelIcons.push(icon);
            }
            // console.log( 'createMapRoute', this.LevelIcons );
        };
        /**
         * 跟踪箭头显示
         */
        SceneLevels.prototype.createImgArrow = function () {
            this.img_arrow = new eui.Image();
            this.img_arrow.source = RES.getRes('PageDownBtn_png');
            this.img_arrow.anchorOffsetX = 124 / 2 - this.group.getChildAt(0).width / 2;
            this.img_arrow.anchorOffsetY = 76;
            this.img_arrow.touchEnabled = false;
            this.img_arrow.x = this.group.getChildAt(0).x;
            this.img_arrow.y = this.group.getChildAt(0).y;
            this.group.addChild(this.img_arrow);
        };
        /**
         * group添加到场景中
         */
        SceneLevels.prototype.groupAddToScene = function () {
            // 开启位图缓存
            this.group.cacheAsBitmap = true;
            // 滚动到最底部
            this.group_levels.scrollV = this.group.height - 1100;
            this.group_levels.addChild(this.group);
            console.log('level data init', this.group_levels);
        };
        /**
         * 设置界面
         */
        SceneLevels.prototype.onclick_setting = function () {
            Game.SoundManager.Instance().PlayClick();
            this.addChild(Game.GameSetting.Instance());
        };
        /**
         * 返回按钮点击回调
         */
        SceneLevels.prototype.onclick_back = function () {
            //设置音效
            Game.SoundManager.Instance().PlayClick();
            //返回游戏开始界面
            this.parent.addChild(Game.ScreenBegin.Instance());
            this.parent.removeChild(this);
        };
        /**
         * 选择关卡
         */
        SceneLevels.prototype.onclick_level = function (e) {
            // 设置音效
            Game.SoundManager.Instance().PlayClick();
            var icon = e.currentTarget;
            // console.log(icon.Level);
            if (this.set_level != icon.Level) {
                this.img_arrow.x = icon.x;
                this.img_arrow.y = icon.y;
                this.set_level = icon.Level;
            }
            else {
                // 进入游戏并开始游戏
                this.parent.addChild(Game.SceneGame.Instance());
                Game.SceneGame.Instance().InitLevel(icon.Level);
                this.parent.removeChild(this);
            }
        };
        /**
         * 标识箭头
         */
        SceneLevels.prototype.OpenLevel = function (level) {
            var icon = this.LevelIcons[level - 1];
            icon.enabled = true;
            if (level > Game.LevelDataManager.Instance().Milestone) {
                Game.LevelDataManager.Instance().Milestone = level;
                //同时将选定标记置于其上
                this.img_arrow.x = icon.x;
                this.img_arrow.y = icon.y;
                this.set_level = level;
            }
        };
        SceneLevels.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        SceneLevels.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.createMapBg();
            this.createMapRoute();
            this.createImgArrow();
            this.groupAddToScene();
        };
        return SceneLevels;
    }(eui.Component));
    Game.SceneLevels = SceneLevels;
    __reflect(SceneLevels.prototype, "Game.SceneLevels", ["eui.UIComponent", "egret.DisplayObject"]);
})(Game || (Game = {}));
