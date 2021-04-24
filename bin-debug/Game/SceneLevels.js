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
    var SceneLevels = (function (_super) {
        __extends(SceneLevels, _super);
        function SceneLevels() {
            var _this = _super.call(this) || this;
            _this.set_level = 0;
            _this.LevelIcons = [];
            _this.skinName = "resource/eui_skins/SceneLevelsSkin.exml";
            //返回按钮
            _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
            //设置
            _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
            //创建地图选项
            var row = 20;
            var col = 10;
            var spanx = 720 / col; //计算行x间隔
            var spany = 1136 / row; //计算列y间隔
            var group = new eui.Group(); //地图背景
            group.width = 720;
            group.height = (spany * 400); //计算出最大尺寸
            //填充背景
            for (var i = 0; i <= (group.height / 1136); i++) {
                var img = new eui.Image();
                img.source = RES.getRes("GameBG2_jpg");
                img.y = i * 1136;
                img.touchEnabled = false;
                _this.group_levels.addChildAt(img, 0);
            }
            //以正弦曲线绘制关卡图标的路径
            var milestone = Game.LevelDataManager.Instance().Milestone;
            for (var i = 0; i < 400; i++) {
                var icon = new components.LevelIcon();
                icon.Level = i + 1;
                icon.y = spany * i / 2;
                icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
                icon.y += spany * i / 2;
                icon.y = group.height - icon.y - spany;
                group.addChild(icon);
                icon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_level, _this);
                //依据进度设置关卡显示
                icon.enabled = i < milestone;
                //保存到一个列表中
                _this.LevelIcons.push(icon);
            }
            //开启位图缓存模式
            group.cacheAsBitmap = true;
            _this.group_levels.addChild(group);
            //卷动到最底层
            _this.group_levels.scrollV = group.height - 1100;
            //跟踪箭头
            _this.img_arrow = new eui.Image();
            _this.img_arrow.source = RES.getRes("PageDownBtn_png");
            _this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
            _this.img_arrow.anchorOffsetY = 76;
            _this.img_arrow.touchEnabled = false;
            _this.img_arrow.x = group.getChildAt(0).x;
            _this.img_arrow.y = group.getChildAt(0).y;
            group.addChild(_this.img_arrow);
            return _this;
        }
        SceneLevels.Instance = function () {
            if (SceneLevels.instance == null)
                SceneLevels.instance = new SceneLevels();
            return SceneLevels.instance;
        };
        /**
         * 设置界面
         */
        SceneLevels.prototype.onclick_setting = function () {
            Game.SoundManager.Instance().PlayClick();
            this.addChild(Game.GameSetting.Instance());
        };
        /**
         * 返回按钮
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
            //设置音效
            Game.SoundManager.Instance().PlayClick();
            var icon = e.currentTarget;
            // console.log(icon.Level);
            if (this.set_level != icon.Level) {
                this.img_arrow.x = icon.x;
                this.img_arrow.y = icon.y;
                this.set_level = icon.Level;
            }
            else {
                //进入游戏并开始游戏
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
        };
        return SceneLevels;
    }(eui.Component));
    Game.SceneLevels = SceneLevels;
    __reflect(SceneLevels.prototype, "Game.SceneLevels", ["eui.UIComponent", "egret.DisplayObject"]);
})(Game || (Game = {}));
//# sourceMappingURL=SceneLevels.js.map