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
        /**
         * 显示设置(声音 音效)界面
         */
        SceneGame.prototype.onclick_setting = function () {
            Game.SoundManager.Instance().PlayClick();
            this.addChild(Game.GameSetting.Instance());
        };
        /**
         * 返回按钮点击回调
         */
        SceneGame.prototype.onclick_back = function () {
            //设置音效
            Game.SoundManager.Instance().PlayClick();
            //返回游戏开始界面
            this.parent.addChild(Game.SceneLevels.Instance());
            this.parent.removeChild(this);
        };
        /**
         * 点击下一题
         */
        SceneGame.prototype.onclick_next = function () {
            this.group_win.visible = false;
            Game.SceneLevels.Instance().OpenLevel(this.levelIndex + 1);
            this.InitLevel(this.levelIndex + 1);
        };
        /**
         *
         * 关卡点击后执行初始化关卡
         * @desc this.words保存当前关卡的成语和随机混合进来的文字
         */
        SceneGame.prototype.InitLevel = function (level) {
            this.levelIndex = level;
            this.levelData = Game.LevelDataManager.Instance().GetLevel(level);
            this.words = this.levelData.answer + this.levelData.word;
            console.log("Now Level: " + level + ", Result: " + this.levelData.answer);
            // 随机一个其他题目的字段混合进本题目
            while (this.words.length == 10) {
                var i = Math.floor(Math.random() * 100);
                if (i != level) {
                    var temp = Game.LevelDataManager.Instance().GetLevel(i);
                    this.words += temp.word + temp.answer;
                }
            }
            // 对字段重排
            var wordArr = [];
            for (var i = 0; i < this.words.length; i++) {
                wordArr.push(this.words.charAt(i));
            }
            wordArr = this.randomList(wordArr); // 10个当前关卡的文字，和随机10文字，随机排列构成的数组
            // 赋值以便可以显示当前关卡的数据(20给备选答案显示)
            // console.log( this.group_words.numChildren );
            for (var i = 0; i < this.group_words.numChildren; i++) {
                var wordShouldShowItem = this.group_words.getChildAt(i);
                // console.log('WrodItem', wordShouldShowItem);
                wordShouldShowItem.setWordText(wordArr[i]); // 改变Word组件的文字内容
                wordShouldShowItem.visible = true;
            }
            // 初始使输入结果为空
            // step1 初始显示空
            for (var i = 0; i < this.group_anwer.numChildren; i++) {
                var answerRect = this.group_anwer.getChildAt(i);
                answerRect.SetSelectWord(null); // step1
                answerRect.visible = true;
                answerRect.SelectWord = null;
            }
            // 提示图像显示
            this.img_question.source = "resource/assets/" + this.levelData.img;
        };
        /**
         * 将一个数组打散随机排列
         * @desc step1 排除当前以及被添加到随机数组的项，避免重复
         */
        SceneGame.prototype.randomList = function (arr) {
            var randomArr = [];
            while (arr.length > 0) {
                var i = Math.floor(Math.random() * arr.length);
                randomArr.push(arr[i]);
                // step 1
                arr.splice(i, 1);
            }
            return randomArr;
        };
        /**
         * 当点击备选文字的是时候，由Word类抛出
         * @param {} word 当前点击的这个备选或者答案
         * @desc 由于使用了组件Word,它里面监听了点击事件，
         *       点击的时候执行Game.SceneGame.Instance().onClick_word(this)
         */
        SceneGame.prototype.onClick_word = function (word) {
            console.log('onClick_word Click Event');
            // 设置点击音效
            Game.SoundManager.Instance().PlayWord();
            // 添加答案及成语的解释
            var sel = null;
            for (var i = 0; i < this.group_anwer.numChildren; i++) {
                var answerWord = this.group_anwer.getChildAt(i);
                if (answerWord.SelectWord == null) {
                    sel = answerWord;
                    break;
                }
            }
            // 当输入的时候判断是否正确
            if (sel != null) {
                console.log('onClick_word Param Word', word.getWordText());
                sel.SetSelectWord(word);
                // 判断是否正确
                var check_str = '';
                for (var i = 0; i < this.group_anwer.numChildren; i++) {
                    var answer = this.group_anwer.getChildAt(i);
                    check_str += answer.getWordText();
                }
                if (check_str == Game.LevelDataManager.Instance().GetLevel(this.levelIndex).answer) {
                    console.log('You Win');
                    this.showWin();
                }
                else {
                    if (check_str.length == 4) {
                        console.log('Oh No Think Again');
                        Game.SoundManager.Instance().PlayWrong();
                    }
                }
            }
        };
        /**
         * 显示胜利和答对弹窗
         */
        SceneGame.prototype.showWin = function () {
            this.group_win.visible = true;
            var levelData = Game.LevelDataManager.Instance().GetLevel(this.levelIndex);
            this.lb_from.text = levelData.tip;
            this.lb_explain.text = levelData.content;
            Game.SoundManager.Instance().PlayRight();
        };
        SceneGame.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        SceneGame.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        return SceneGame;
    }(eui.Component));
    Game.SceneGame = SceneGame;
    __reflect(SceneGame.prototype, "Game.SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
    var LevelDataItem = (function () {
        function LevelDataItem() {
        }
        return LevelDataItem;
    }());
    __reflect(LevelDataItem.prototype, "LevelDataItem");
})(Game || (Game = {}));
