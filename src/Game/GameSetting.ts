namespace Game {
	/**
	 * 游戏控制 
	 */
	export class GameSetting extends eui.Component implements  eui.UIComponent {
		/**
		 * @vars {} instance
		 * @vars {} btn_agree '确定'按钮，相当于直接关闭界面
		 * @vars {} img_music_disable 音乐静音显示图片
		 * @vars {} img_sound_disable 声音静音显示
		 * @vars {} btn_sound 游戏背景声音控制按钮
		 * @vars {} btn_music 游戏音效控制按钮
		 */
		private static instance: GameSetting
		private btn_agree: eui.Button
		private img_music_disable: eui.Image
		private img_sound_disable: eui.Image
		private btn_sound: eui.Button
		private btn_music: eui.Button

		/**
		 * 返回单例 
		 */
		public static Instance() {
			if (GameSetting.instance == null) {
				GameSetting.instance = new GameSetting();
			}
			return GameSetting.instance;
		}

		public constructor() {
			super();
			// step1
			this.skinName = 'GameSettingSkin';
			// step2
			this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnAgreeTap, this);
			this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnSoundTap, this);
			this.img_sound_disable.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnSoundTap, this);
			this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnMusicTap, this);
			this.img_music_disable.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnMusicTap, this);
			// step3
			this.update_buttonstate();
		}

		/**
		 * 同意按钮（btn_agree）点击回调--相当于关闭界面
		 */
		private _onBtnAgreeTap(): void {
			SoundManager.Instance().PlayClick();
			this.parent.removeChild(this);
		}

		/**
		 * 背景音乐按钮点击回调 
		 */
		private _onBtnMusicTap(): void {
			SoundManager.Instance().PlayClick();
			SoundManager.Instance().IsMusic = !SoundManager.Instance().IsMusic;
			console.log(`Now IsMusic: ${SoundManager.Instance().IsMusic}`);
			this.update_buttonstate();
			// console.log('click left music btn');
		}

		/**
		 * 游戏音效按钮点击回调 
		 */
		private _onBtnSoundTap() {
			SoundManager.Instance().PlayClick();
			SoundManager.Instance().IsSound = !SoundManager.Instance().IsSound;
			this.update_buttonstate();
			console.log('click right sound btn');
		}

		/**
		 * 通过声音管理类来处理界面显示 
		 */
		private update_buttonstate(): void {
			this.img_music_disable.visible = !SoundManager.Instance().IsMusic;
			this.img_sound_disable.visible = !SoundManager.Instance().IsSound;
		}

		protected partAdded(partName:string,instance:any):void {
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void {
			super.childrenCreated();
		}
		
	}
}