module Game {
	export class ScreenBegin extends eui.Component implements eui.UIComponent{
		//单例
		private static instance:ScreenBegin;
		public static Instance(){
			if(ScreenBegin.instance == null)
				ScreenBegin.instance = new ScreenBegin();
			return ScreenBegin.instance;
		}
		private btn_begin:eui.Button;//开始游戏按钮
		private btn_setting:eui.Button;//设置游戏按钮
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ScreenBeginSkin.exml";
			//开始
			this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);
			//设置
			this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
			//开始播放背景音乐
			SoundManager.Instance().PlayBGM();
		}

		/**
		 * 设置界面
		 */
		private onclick_setting(){
			SoundManager.Instance().PlayClick();
			this.addChild(GameSetting.Instance());
		}

		/**
		 * 游戏开始，先选关卡
		 */
		private onclick_begin(){
			SoundManager.Instance().PlayClick();
			// 游戏开始前，先选择关卡界面
			this.parent.addChild(SceneLevels.Instance());
			this.parent.removeChild(this);
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
		}
	}
}