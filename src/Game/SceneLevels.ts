module Game {
	export class SceneLevels extends eui.Component implements eui.UIComponent {
		//单例
		private static instance: SceneLevels;
		public static Instance() {
			if (SceneLevels.instance == null)
				SceneLevels.instance = new SceneLevels();
			return SceneLevels.instance;
		}
		private group_levels: eui.Group;
		private btn_back: eui.Button;
		private img_arrow: eui.Image;
		private set_level: number = 0;
		private LevelIcons: components.LevelIcon[] = [];
		private btn_setting: eui.Button;//设置游戏按钮
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/SceneLevelsSkin.exml";
			//返回按钮
			this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
			//设置
			this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_setting, this);
			//创建地图选项
			let row = 20;
			let col = 10;
			let spanx = 720 / col;//计算行x间隔
			let spany = 1136 / row;//计算列y间隔
			let group = new eui.Group();//地图背景
			group.width = 720;
			group.height = (spany * 400);//计算出最大尺寸
			//填充背景
			for (let i = 0; i <= (group.height / 1136); i++) {
				let img = new eui.Image();
				img.source = RES.getRes("GameBG2_jpg");
				img.y = i * 1136;
				img.touchEnabled = false;
				this.group_levels.addChildAt(img, 0);
			}
			//以正弦曲线绘制关卡图标的路径
			let milestone: number = Game.LevelDataManager.Instance().Milestone;
			for (let i = 0; i < 400; i++) {
				let icon = new components.LevelIcon();
				icon.Level = i + 1;
				icon.y = spany * i / 2;
				icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
				icon.y += spany * i / 2;
				icon.y = group.height - icon.y - spany;
				group.addChild(icon);
				icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
				//依据进度设置关卡显示
				icon.enabled = i < milestone;
				//保存到一个列表中
				this.LevelIcons.push(icon);
			}
			//开启位图缓存模式
			group.cacheAsBitmap = true;
			this.group_levels.addChild(group);
			//卷动到最底层
			this.group_levels.scrollV = group.height - 1100;
			//跟踪箭头
			this.img_arrow = new eui.Image();
			this.img_arrow.source = RES.getRes("PageDownBtn_png");
			this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
			this.img_arrow.anchorOffsetY = 76;
			this.img_arrow.touchEnabled = false;
			this.img_arrow.x = group.getChildAt(0).x;
			this.img_arrow.y = group.getChildAt(0).y;
			group.addChild(this.img_arrow);
		}
		/**
		 * 设置界面
		 */
		private onclick_setting() {
			SoundManager.Instance().PlayClick();
			this.addChild(GameSetting.Instance());
		}
		/**
		 * 返回按钮
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
			//设置音效
			SoundManager.Instance().PlayClick();
			let icon = <components.LevelIcon>e.currentTarget;
			// console.log(icon.Level);
			if (this.set_level != icon.Level) {
				this.img_arrow.x = icon.x;
				this.img_arrow.y = icon.y;
				this.set_level = icon.Level;
			}
			else {
				//进入游戏并开始游戏
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

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
}