module Game {
	export class SceneGame extends eui.Component implements eui.UIComponent {
		//单例
		private static instance: SceneGame;
		public static Instance() {
			if (SceneGame.instance == null) {
				SceneGame.instance = new SceneGame();
			}
			return SceneGame.instance;
		}
		//对象变量
		private group_anwer: eui.Group;
		private group_words: eui.Group;
		private img_question: eui.Image;
		private btn_back: eui.Button;
		private levelIndex: number;
		private btn_setting:eui.Button;//设置游戏按钮
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/SceneGameSkin.exml";
			//返回按钮
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
			//设置
			this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
			//下一题按钮
			this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_next,this);
		}
		//初始化关卡
		public InitLevel(level: number) {
			this.levelIndex = level;
			let leveldata = LevelDataManager.Instance().GetLevel(level);
			//将字段接起来
			let words = leveldata.answer + leveldata.word;
			//随机一个其它题目的字段混合进本题目
			while (words.length == 10) {
				let i = Math.floor(Math.random() * 400);
				if (i != level) {
					let temp = LevelDataManager.Instance().GetLevel(i);
					words += temp.word + temp.answer;
				}
			}
			//对字段重排
			let wordlist: string[] = [];
			for (let i = 0; i < words.length; i++) {
				wordlist.push(words.charAt(i));
			}
			wordlist = this.randomlist(wordlist);
			//赋值
			for (let i = 0; i < this.group_words.numChildren; i++) {
				let wordrect = <components.Word>this.group_words.getChildAt(i);
				wordrect.setWordText(wordlist[i]);
				wordrect.visible = true;
			}
			//重置一些状态
			for (let i = 0; i < this.group_anwer.numChildren; i++) {
				let answerrect = <components.AnswerWord>this.group_anwer.getChildAt(i);
				answerrect.SetSelectWord(null);
				answerrect.visible = true;
				answerrect.SelectWord = null;
			}
			//显示图像
			this.img_question.source = "resource/assets/" + leveldata.img;
		}

		//将一个数列随机
		public randomlist(arr: any[]): any[] {
			let array = [];
			while (arr.length > 0) {
				let i = Math.floor(Math.random() * arr.length);
				array.push(arr[i]);
				arr.splice(i, 1);
			}
			return array;
		}

		//当字点击的时候，由word类抛出
		public onclick_word(word: components.Word) {
			//设置音效
			SoundManager.Instance().PlayWord();
			//找到一个合适的位置添加进答案内容
			let sel: components.AnswerWord = null;
			for (let i = 0; i < this.group_anwer.numChildren; i++) {
				let answer = <components.AnswerWord>this.group_anwer.getChildAt(i);
				if (answer.SelectWord == null) {
					sel = answer;
					break;
				}
			}
			//当有一个适合的位置的时候就会将字填充，并判断是否胜利
			if (sel != null) {
				sel.SetSelectWord(word);
				//判断是否胜利
				let check_str: string = "";
				for (let i = 0; i < this.group_anwer.numChildren; i++) {
					let answer = <components.AnswerWord>this.group_anwer.getChildAt(i);
					check_str += answer.getWordText();
				}
				if (check_str == LevelDataManager.Instance().GetLevel(this.levelIndex).answer) {
					//胜利
					// console.log("胜利");
					this.showWin();
				}
				else{
					if(check_str.length == 4){
						SoundManager.Instance().PlayWrong();
					}
				}
			}
		}
		/**
		 * 设置界面
		 */
		private onclick_setting(){
			SoundManager.Instance().PlayClick();
			this.addChild(GameSetting.Instance());
		}
		/**
		 * 返回按钮
		 */
		protected onclick_back() {
			//设置音效
			SoundManager.Instance().PlayClick();
			//返回关卡界面
			this.parent.addChild(SceneLevels.Instance());
			this.parent.removeChild(this);
		}

		//弹层处理
		private group_win: eui.Group;//胜利界面的group控件
		private btn_next: eui.Button;//下一个题目
		private lb_from: eui.Label;//成语出处
		private lb_explain: eui.Label;//成语解释
		/**
		 * 下一题
		 */
		private onclick_next() {
			//设置音效
			SoundManager.Instance().PlayRight();
			this.group_win.visible = false;
			SceneLevels.Instance().OpenLevel(this.levelIndex + 1);
			this.InitLevel(this.levelIndex + 1);
		}
		/**
		 * 显示胜利或答对弹窗
		 */
		private showWin(){
			this.group_win.visible=true;
			let leveldata = LevelDataManager.Instance().GetLevel(this.levelIndex);
			this.lb_from.text = leveldata.tip;
			this.lb_explain.text = leveldata.content;
		}
	}
}