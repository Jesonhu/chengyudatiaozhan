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
    var SceneGame = (function (_super) {
        __extends(SceneGame, _super);
        function SceneGame() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/eui_skins/SceneGameSkin.exml";
            //返回按钮
            _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
            //设置
            _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
            //下一题按钮
            _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
            return _this;
        }
        SceneGame.Instance = function () {
            if (SceneGame.instance == null) {
                SceneGame.instance = new SceneGame();
            }
            return SceneGame.instance;
        };
        //初始化关卡
        SceneGame.prototype.InitLevel = function (level) {
            this.levelIndex = level;
            var leveldata = Game.LevelDataManager.Instance().GetLevel(level);
            //将字段接起来
            var words = leveldata.answer + leveldata.word;
            //随机一个其它题目的字段混合进本题目
            while (words.length == 10) {
                var i = Math.floor(Math.random() * 400);
                if (i != level) {
                    var temp = Game.LevelDataManager.Instance().GetLevel(i);
                    words += temp.word + temp.answer;
                }
            }
            //对字段重排
            var wordlist = [];
            for (var i = 0; i < words.length; i++) {
                wordlist.push(words.charAt(i));
            }
            wordlist = this.randomlist(wordlist);
            //赋值
            for (var i = 0; i < this.group_words.numChildren; i++) {
                var wordrect = this.group_words.getChildAt(i);
                wordrect.setWordText(wordlist[i]);
                wordrect.visible = true;
            }
            //重置一些状态
            for (var i = 0; i < this.group_anwer.numChildren; i++) {
                var answerrect = this.group_anwer.getChildAt(i);
                answerrect.SetSelectWord(null);
                answerrect.visible = true;
                answerrect.SelectWord = null;
            }
            //显示图像
            this.img_question.source = "resource/assets/" + leveldata.img;
        };
        //将一个数列随机
        SceneGame.prototype.randomlist = function (arr) {
            var array = [];
            while (arr.length > 0) {
                var i = Math.floor(Math.random() * arr.length);
                array.push(arr[i]);
                arr.splice(i, 1);
            }
            return array;
        };
        //当字点击的时候，由word类抛出
        SceneGame.prototype.onclick_word = function (word) {
            //设置音效
            Game.SoundManager.Instance().PlayWord();
            //找到一个合适的位置添加进答案内容
            var sel = null;
            for (var i = 0; i < this.group_anwer.numChildren; i++) {
                var answer = this.group_anwer.getChildAt(i);
                if (answer.SelectWord == null) {
                    sel = answer;
                    break;
                }
            }
            //当有一个适合的位置的时候就会将字填充，并判断是否胜利
            if (sel != null) {
                sel.SetSelectWord(word);
                //判断是否胜利
                var check_str = "";
                for (var i = 0; i < this.group_anwer.numChildren; i++) {
                    var answer = this.group_anwer.getChildAt(i);
                    check_str += answer.getWordText();
                }
                if (check_str == Game.LevelDataManager.Instance().GetLevel(this.levelIndex).answer) {
                    //胜利
                    // console.log("胜利");
                    this.showWin();
                }
                else {
                    if (check_str.length == 4) {
                        Game.SoundManager.Instance().PlayWrong();
                    }
                }
            }
        };
        /**
         * 设置界面
         */
        SceneGame.prototype.onclick_setting = function () {
            Game.SoundManager.Instance().PlayClick();
            this.addChild(Game.GameSetting.Instance());
        };
        /**
         * 返回按钮
         */
        SceneGame.prototype.onclick_back = function () {
            //设置音效
            Game.SoundManager.Instance().PlayClick();
            //返回关卡界面
            this.parent.addChild(Game.SceneLevels.Instance());
            this.parent.removeChild(this);
        };
        /**
         * 下一题
         */
        SceneGame.prototype.onclick_next = function () {
            //设置音效
            Game.SoundManager.Instance().PlayRight();
            this.group_win.visible = false;
            Game.SceneLevels.Instance().OpenLevel(this.levelIndex + 1);
            this.InitLevel(this.levelIndex + 1);
        };
        /**
         * 显示胜利或答对弹窗
         */
        SceneGame.prototype.showWin = function () {
            this.group_win.visible = true;
            var leveldata = Game.LevelDataManager.Instance().GetLevel(this.levelIndex);
            this.lb_from.text = leveldata.tip;
            this.lb_explain.text = leveldata.content;
        };
        return SceneGame;
    }(eui.Component));
    Game.SceneGame = SceneGame;
    __reflect(SceneGame.prototype, "Game.SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
})(Game || (Game = {}));
//# sourceMappingURL=SceneGame.js.map