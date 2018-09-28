namespace Game {
	export class SceneGame extends eui.Component implements eui.UIComponent {
		/**
		 * @vars {} instance 单例 
		 * @vars {} levelIndex 保存当前得关卡关数
		 * @vars {} words
		 */
		private static instance: SceneGame;
		
		// eui对象变量
		private group_anwer: eui.Group;
		private group_words: eui.Group;
		private img_question: eui.Image;
		private btn_back: eui.Button;
		
		private words: string
		private btn_setting:eui.Button;//设置游戏按钮

		private levelIndex: number; // 当前关卡在总关卡中的索引
		private levelData: LevelDataItem // 当前关卡的数据
		
    // 弹层处理
		private group_win: eui.Group;//胜利界面的group控件
		private btn_next: eui.Button;//下一个题目
		private lb_from: eui.Label;//成语出处
		private lb_explain: eui.Label;//成语解释

		public static Instance() {
			if (SceneGame.instance == null) {
				SceneGame.instance = new SceneGame();
			}
			return SceneGame.instance;
		}

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

		/**
		 * 显示设置(声音 音效)界面 
		 */
		private onclick_setting() {
			SoundManager.Instance().PlayClick();
			this.addChild(GameSetting.Instance());
		}

		/**
		 * 返回按钮点击回调
		 */
		private onclick_back() {
			//设置音效
			SoundManager.Instance().PlayClick();
			//返回游戏开始界面
			this.parent.addChild(SceneLevels.Instance())
			this.parent.removeChild(this);
		}

		/**
		 * 点击下一题 
		 */
		private onclick_next(): void {
			this.group_win.visible = false;
			SceneLevels.Instance().OpenLevel( this.levelIndex + 1 );
			this.InitLevel(this.levelIndex + 1);
		}

		/**
		 * 
		 * 关卡点击后执行初始化关卡
		 * @desc this.words保存当前关卡的成语和随机混合进来的文字
		 */
		public InitLevel(level: number) {
			this.levelIndex = level;
			this.levelData = LevelDataManager.Instance().GetLevel(level);
			this.words = this.levelData.answer + this.levelData.word;
			console.log(`Now Level: ${level}, Result: ${this.levelData.answer}`);
			// 随机一个其他题目的字段混合进本题目
			while (this.words.length == 10) {
				const i = Math.floor( Math.random() * 100 );
				if (i != level) {
					const temp = LevelDataManager.Instance().GetLevel(i);
					this.words += temp.word + temp.answer;
				}
			}

			// 对字段重排
			let wordArr: string[] = [];
			for (let i = 0; i < this.words.length; i++) {
				wordArr.push( this.words.charAt(i) );
			}
			wordArr = this.randomList( wordArr ); // 10个当前关卡的文字，和随机10文字，随机排列构成的数组

			// 赋值以便可以显示当前关卡的数据(20给备选答案显示)
			// console.log( this.group_words.numChildren );
			for (let i: number = 0; i < this.group_words.numChildren; i++) {
				let wordShouldShowItem = <components.Word>this.group_words.getChildAt(i);
				// console.log('WrodItem', wordShouldShowItem);
				wordShouldShowItem.setWordText( wordArr[i] ); // 改变Word组件的文字内容
				wordShouldShowItem.visible = true;
			}
			
			// 初始使输入结果为空
			// step1 初始显示空
			for (let i: number = 0; i < this.group_anwer.numChildren; i++) {
				const answerRect = <components.AnswerWord>this.group_anwer.getChildAt(i);
				answerRect.SetSelectWord(null); // step1
				answerRect.visible = true;
				answerRect.SelectWord = null;
			}

			// 提示图像显示
			this.img_question.source = `resource/assets/${this.levelData.img}`;
		}

		/**
		 * 将一个数组打散随机排列
		 * @desc step1 排除当前以及被添加到随机数组的项，避免重复
		 */
		public randomList(arr: any[]): any[] {
			const randomArr = [];
			while (arr.length > 0) {
				const i = Math.floor(Math.random() * arr.length);
				randomArr.push( arr[i] );
				// step 1
				arr.splice(i, 1);
			}
			return randomArr;
		}

		/**
		 * 当点击备选文字的是时候，由Word类抛出 
		 * @param {} word 当前点击的这个备选或者答案 
		 * @desc 由于使用了组件Word,它里面监听了点击事件，
		 *       点击的时候执行Game.SceneGame.Instance().onClick_word(this)
		 */
		public onClick_word(word: components.Word): void {
			console.log('onClick_word Click Event');
			// 设置点击音效
			SoundManager.Instance().PlayWord();	

			// 添加答案及成语的解释
			let sel: components.AnswerWord = null;
			for (let i = 0; i < this.group_anwer.numChildren; i++) {
				const answerWord = <components.AnswerWord>this.group_anwer.getChildAt(i);
				if (answerWord.SelectWord == null) { // 答案区域为空时的点击
					sel = answerWord;
					break;
				}
			}

			// 当输入的时候判断是否正确
			if (sel != null) { // 答案区域不是空的时候才执行判断
				console.log('onClick_word Param Word', word.getWordText());
				sel.SetSelectWord(word);

				// 判断是否正确
				let check_str: string = '';
				for (let i = 0; i < this.group_anwer.numChildren; i++) {
					const answer = <components.AnswerWord> this.group_anwer.getChildAt(i);
					check_str += answer.getWordText();
				}
				if (check_str == LevelDataManager.Instance().GetLevel( this.levelIndex ).answer) { // 正确
					console.log('You Win');
					this.showWin();
				} else{ // 错误
					if (check_str.length == 4) { // 当选着四个字的时候才会检查是否正确
						console.log('Oh No Think Again');
						SoundManager.Instance().PlayWrong();
					}
				}
			}
	  }

		/**
		 * 显示胜利和答对弹窗 
		 */
		private showWin(): void {
			this.group_win.visible = true;
			const levelData = LevelDataManager.Instance().GetLevel( this.levelIndex );
			
			this.lb_from.text = levelData.tip;
			this.lb_explain.text = levelData.content;
			SoundManager.Instance().PlayRight();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}

	class LevelDataItem {
		public answer: string;
		public img: string;
		public word: string;
		public tip: string;
		public content: string;
	}
}