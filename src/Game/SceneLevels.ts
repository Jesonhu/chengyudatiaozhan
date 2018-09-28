namespace Game {
	/**
	 * 关卡选择舞台界面 
	 */
	export class SceneLevels extends eui.Component implements  eui.UIComponent {
		/**
		 * @vars {} instance 单例
		 * @vars {} btn_setting 设置游戏按钮
		 * @vars {} LEVEL_MAX 最多的关卡
		 */
		private static instance: SceneLevels
		public group_levels:eui.Group
		public btn_back:eui.Button
		public btn_setting:eui.Button
		private img_arrow: eui.Image // 跟踪箭头
		private set_level: number = 0
		private LevelIcons: components.LevelIcon[] = []

		private LEVEL_MAX: number = 100
		private row: number = 20
		private col: number = 10
		private spanX: number = 720 / this.col // 计算行x间隔
		private spanY: number = 1136 / this.row // 计算y间距
		private group: eui.Group // 地图容器
		private icon: components.LevelIcon // 地图关卡每关显示

		
		/**
		 * 返回单例或者类实例对象 
		 */
		public static Instance() {
			if (SceneLevels.instance == null) {
				SceneLevels.instance = new SceneLevels();
			}
			return SceneLevels.instance
		}

		public constructor() {
			super();
			this.skinName = "resource/eui_skins/SceneLevelsSkin.exml";
			//返回按钮
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
			//设置
			this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_setting, this);
		}

		/**
		 * createMapUI -- 创建地图背景 Logic && UI
		 */
		private createMapBg(): void {
			this.group = new eui.Group(); // 地图背景
			this.group.width = 720;
			this.group.height = this.spanY * this.LEVEL_MAX; // 计算出最大高度
			console.log('group height', this.group.height);

			const BgImgHei: number = this.group.height / 1136; // 

			// 填充背景
			for (let i: number = 0, groupLen = this.group.height / 1136; i < groupLen; i++) {
				const img: eui.Image = new eui.Image();
				img.source = RES.getRes('GameBG2_jpg');
				img.y = i * 1136;
				img.touchEnabled = false;
				this.group_levels.addChildAt(img, 0);
			}
		}

		/**
		 * 以正弦曲线绘制关卡图标的路径
		 * @desc icon不能设置为全局的
		 */
		private createMapRoute(): void {
			const milestone: number = Game.LevelDataManager.Instance().Milestone;
			this.set_level = milestone;
			for (let i: number = 0; i < this.LEVEL_MAX; i++) {
				let icon = new components.LevelIcon();
				
				icon.Level = i + 1;
				icon.y = this.spanY * i / 2;
				icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + this.group.width / 2;
				icon.y += this.spanY * i / 2;
				icon.y = this.group.height - icon.y - this.spanY;
				this.group.addChild(icon);
				icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
				// 依据进度设置关卡显示
				icon.enabled = i < milestone;
				// 保存到一个列表中
				this.LevelIcons.push(icon);
			}
			// console.log( 'createMapRoute', this.LevelIcons );
		}

		/**
		 * 跟踪箭头显示 
		 */
		private createImgArrow(): void {
			this.img_arrow = new eui.Image();
			this.img_arrow.source = RES.getRes('PageDownBtn_png');
			this.img_arrow.anchorOffsetX = 124 / 2 - this.group.getChildAt(0).width / 2;
			this.img_arrow.anchorOffsetY = 76;
			this.img_arrow.touchEnabled = false;
			this.img_arrow.x = this.group.getChildAt(0).x;
			this.img_arrow.y = this.group.getChildAt(0).y;
			this.group.addChild(this.img_arrow);
		}

		/**
		 * group添加到场景中 
		 */
		private groupAddToScene(): void {
			// 开启位图缓存
			this.group.cacheAsBitmap = true;
			// 滚动到最底部
			this.group_levels.scrollV = this.group.height - 1100;
			this.group_levels.addChild(this.group);
			console.log('level data init', this.group_levels);
		}

		/**
		 * 设置界面
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
			this.parent.addChild(ScreenBegin.Instance())
			this.parent.removeChild(this);
		}

		/**
		 * 选择关卡
		 */
		private onclick_level(e: egret.TouchEvent) {
			// 设置音效
			SoundManager.Instance().PlayClick();
			let icon = <components.LevelIcon>e.currentTarget;
			// console.log(icon.Level);
			if (this.set_level != icon.Level) { // 点击的是其他关卡，不是当前可以点击的最高关卡
				this.img_arrow.x = icon.x;
				this.img_arrow.y = icon.y;
				this.set_level = icon.Level;
			} else {
				// 进入游戏并开始游戏
				this.parent.addChild(SceneGame.Instance());
				SceneGame.Instance().InitLevel(icon.Level);
				this.parent.removeChild(this);
			}
		}

		/**
		 * 标识箭头
		 */
		public OpenLevel(level: number) {
			let icon = this.LevelIcons[level - 1];
			icon.enabled = true;
			if (level > LevelDataManager.Instance().Milestone) {
				LevelDataManager.Instance().Milestone = level;
				//同时将选定标记置于其上
				this.img_arrow.x = icon.x;
				this.img_arrow.y = icon.y;
				this.set_level = level;
			}
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void {
			super.childrenCreated();

			this.createMapBg();
			this.createMapRoute();
			this.createImgArrow();
			this.groupAddToScene();
		}
		
	}
}