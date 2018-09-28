namespace components {
	/**
	 * 关卡图标 
	 */
	export class LevelIcon extends eui.Button implements  eui.UIComponent {
		public lb_level:eui.Label

		public constructor() {
			super();
			this.skinName = 'resource/eui_skins/components/LevelIconSkin.exml';
			// this.skinName = LevelIconSkin;
		}

		public get Level(): number {
			return parseInt(this.lb_level.text);
		}

		public set Level(value: number) {
			this.lb_level.text = value.toString();
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