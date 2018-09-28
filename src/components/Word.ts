namespace components {
	export class Word extends eui.Component implements  eui.UIComponent {
		/**
		 * 
		 */
		protected lb_text:eui.Label;

		public constructor() {
			super();
			this.skinName = 'WordSkin';
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_tap, this);
		}

		/**
		 * 备选文字点击回调 Logic 
		 */
		protected onClick_tap(): void {
			Game.SceneGame.Instance().onClick_word(this);
		}

		/**
		 * 给每个Word赋一个值 
		 */
		public setWordText(value: string): void {
			this.lb_text.text = value;
		}

		/**
		 * 获取当前点击Word的值 
		 */
		public getWordText(): string {
			return this.lb_text.text;
		}

		protected partAdded(partName:string,instance:any):void {
			super.partAdded(partName,instance);
		}

		protected childrenCreated():void {
			super.childrenCreated();
		}
		
	}
}