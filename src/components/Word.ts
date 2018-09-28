module components {
	export class Word extends eui.Component implements eui.UIComponent{
		protected lb_text:eui.Label;
		public constructor() {
			super();
			this.skinName = "resource/components/WordSkin.exml";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_tap,this);
		}

		protected onclick_tap(){
			// console.log(this.lb_text.text);
			Game.SceneGame.Instance().onclick_word(this);
		}

		public setWordText(value:string){
			this.lb_text.text = value;
		}

		public getWordText():string{
			return this.lb_text.text;
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