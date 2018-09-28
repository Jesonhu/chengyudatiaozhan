namespace components {
  /**
   * 备选答案点击后处理类 
   */
  export class AnswerWord extends Word {
    /**
     * @vars {} SelectWord 当前选中的文字
     */
    public SelectWord: Word = null

    public constructor() {
      super();
    }

    /**
     * 点击文字处理(重写了Word的点击事件处理回调。
     * 这里只有使用了AnswerWord即答案点击才会生效)
     * @desc 将当前点击的备选文字隐藏
     * @desc step1 执行Word类的方法
     */
    protected onClick_tap(): void {
      console.log('onClick_tap Click Event');
      Game.SoundManager.Instance().PlayWord();
      if (this.SelectWord != null) {
        this.SelectWord.visible = true;
        this.SelectWord = null;
        // step1
        this.setWordText('');
      }
    }

    /**
     * 当一个备选字被选择添加到回答的时候。设置自己不可见，并保存到本对象以后使用 )
     */
    public SetSelectWord(word: Word): void {
      if (word != null) {
        this.setWordText( word.getWordText() );
        this.SelectWord = word;
        word.visible = false;
      } else {
        this.setWordText('');
        this.SelectWord = null;
      }
    }
  }
}