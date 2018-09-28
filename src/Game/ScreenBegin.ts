namespace Game {
	/**
	 * 游戏开始界面类 
	 */
	export class ScreenBegin extends eui.Component implements  eui.UIComponent {
		/**
		 * @vars {} instance 单例
		 * @vars {} btn_setting 设置声音按钮
		 * @vars {} btn_begin 开始游戏按钮
		 */
		private static instance: ScreenBegin
		public btn_setting:eui.Button;
		public btn_begin:eui.Button;

		/**
		 * @desc step1 加载皮肤
		 * @desc step2 开始游戏按钮注册并监听点击
		 * @desc step3 设置游戏按钮注册并监听点击
		 * @desc step4 开始播放背景音乐
		 */
		public constructor() {
			super();
			// step1
			this.skinName = 'ScreenBeginSkin';
			
		}

		/**
		 * 单例模式 Logic 
		 * 返回实例对象或者返回自己
		 */
		public static Instance() {
			if (ScreenBegin.instance == null) {
				ScreenBegin.instance = new ScreenBegin();
			}
			return ScreenBegin.instance;
		}

		protected partAdded(partName:string,instance:any):void {
			super.partAdded(partName,instance);
		}

		/**
		 * 开始游戏按钮点击回调 
		 */
		private _onBtnBeginTap(): void {
			SoundManager.Instance().PlayClick();
			// step1
			this.parent.addChild(SceneLevels.Instance());
			this.parent.removeChild(this);
		}

		/**
		 * 设置游戏按钮点击回调 
		 * @desc step1 声音管理(SoundManager单例对象执行PlayClick())
		 */
		private _onBtnSettingTap(): void {
			SoundManager.Instance().PlayClick();
			this.addChild(GameSetting.Instance());
		}


		protected childrenCreated():void {
			super.childrenCreated();

			// step2
			this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnBeginTap, this);
			// step3
			this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBtnSettingTap, this);
			// step4
			SoundManager.Instance().PlayBGM();
		}
		
	}
}