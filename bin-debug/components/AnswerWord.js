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
var components;
(function (components) {
    /**
     * 备选答案点击后处理类
     */
    var AnswerWord = (function (_super) {
        __extends(AnswerWord, _super);
        function AnswerWord() {
            var _this = _super.call(this) || this;
            /**
             * @vars {} SelectWord 当前选中的文字
             */
            _this.SelectWord = null;
            return _this;
        }
        /**
         * 点击文字处理(重写了Word的点击事件处理回调。
         * 这里只有使用了AnswerWord即答案点击才会生效)
         * @desc 将当前点击的备选文字隐藏
         * @desc step1 执行Word类的方法
         */
        AnswerWord.prototype.onClick_tap = function () {
            console.log('onClick_tap Click Event');
            Game.SoundManager.Instance().PlayWord();
            if (this.SelectWord != null) {
                this.SelectWord.visible = true;
                this.SelectWord = null;
                // step1
                this.setWordText('');
            }
        };
        /**
         * 当一个备选字被选择添加到回答的时候。设置自己不可见，并保存到本对象以后使用 )
         */
        AnswerWord.prototype.SetSelectWord = function (word) {
            if (word != null) {
                this.setWordText(word.getWordText());
                this.SelectWord = word;
                word.visible = false;
            }
            else {
                this.setWordText('');
                this.SelectWord = null;
            }
        };
        return AnswerWord;
    }(components.Word));
    components.AnswerWord = AnswerWord;
    __reflect(AnswerWord.prototype, "components.AnswerWord");
})(components || (components = {}));
