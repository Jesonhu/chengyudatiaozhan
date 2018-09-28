namespace Game {
	/**
	 * 关卡资料处理类 
	 */
	export class LevelDataManager {
		/**
		 * @vars {} instance 单例
		 * @vars {} items 一个保存关卡数据的组
		 */
		private static instance: LevelDataManager
		private items: LevelDataItem[] = [];

		public static Instance() {
			if (LevelDataManager.instance == null) {
				LevelDataManager.instance = new LevelDataManager();
			}
			return LevelDataManager.instance;
		}
		
		/**
		 * @desc step1 使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构(获取resource/questions.json的数据)
		 */
		public constructor() {
			// step1
			this.items = RES.getRes("questions_json");
		}
		
		/**
		 * 通过关卡号获得一个关的数据 
		 */
		public GetLevel(level: number): LevelDataItem {
			if (level < 0) level = 0;
			if (level >= this.items.length) level = this.items.length - 1;
			return this.items[level];
		}
		/**
		 * 获得当前的游戏最远进度(没有数据，默认第一关)
		 */
		public get Milestone(): number {
			let milestone = egret.localStorage.getItem("Milestone");
			//如果没有数据，那么默认就是第一关
			if (milestone == "" || milestone == null)
				milestone = "1";
			return parseInt(milestone);
		}
		public set Milestone(value:number){
			egret.localStorage.setItem("Milestone",value.toString());
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