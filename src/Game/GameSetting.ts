module Game {
	export class GameSetting extends eui.Component implements eui.UIComponent {
		//单例
		private static instance: GameSetting;
		public static Instance() {
			if (GameSetting.instance == null) {
				GameSetting.instance = new GameSetting();
			}
			return GameSetting.instance;
		}
		private btn_agree: eui.Button;       //同意按钮，相当于直接关闭界面
		private img_music_disable: eui.Image;//音乐静音显示
		private img_sound_disable: eui.Image;//声音静音显示
		private btn_sound: eui.Button;      //声音按钮
		private btn_music: eui.Button;      //音乐按钮
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/GameSettingSkin.exml";
			this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_agree, this);
			this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_sound, this);
			this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_music, this);
			//通过声音管理类来处理界面显示
			this.update_buttonstate();
		}

		private click_agree() {
			SoundManager.Instance().PlayClick();
			this.parent.removeChild(this);
		}
		private click_sound() {
			SoundManager.Instance().PlayClick();
			SoundManager.Instance().IsSound = !SoundManager.Instance().IsSound;
			this.update_buttonstate();
		}
		private click_music() {
			SoundManager.Instance().PlayClick();
			SoundManager.Instance().IsMusic = !SoundManager.Instance().IsMusic;
			this.update_buttonstate();
		}
		private update_buttonstate() {
			this.img_music_disable.visible = !SoundManager.Instance().IsMusic;
			this.img_sound_disable.visible = !SoundManager.Instance().IsSound;
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
}