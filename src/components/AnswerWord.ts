module components {
	export class AnswerWord extends Word {
		public SelectWord:Word = null;
		public constructor() {
			super();
		}
		protected onclick_tap(){
			//设置音效
			Game.SoundManager.Instance().PlayWord();
			if(this.SelectWord != null){
				this.SelectWord.visible = true;
				this.SelectWord = null;
				this.setWordText("");
			}
		}
		//当一个问题字被选择添加到回答的时候，设置不可见，并保存到本对象以后使用
		public SetSelectWord(word:Word){
			if(word!=null){
				this.setWordText(word.getWordText());
				this.SelectWord = word;
				word.visible=false;
			}
			else{
				this.setWordText("");
				this.SelectWord = null;
			}
		}
	}
}