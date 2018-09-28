namespace Game {
  /**
   * 音乐播放控制 
   */
  export class SoundManager extends egret.DisplayObjectContainer {
    /**
     * @vars {} instance 单例
     * @vars {} _click 点击声音
     * @vars {} _word 点击选择字块的声音
     * @vars {} _right 成语猜正确的声音
     * @vars {} _wrong 成语猜错的声音
     * @vars {} _bgm 背景音乐
     * @vars {} _bgm_channel 用来保存静音
     */
    private static instance: SoundManager
    private _click: egret.Sound
    private _word: egret.Sound
    private _right: egret.Sound
    private _wrong: egret.Sound
    private _bgm: egret.Sound
    private _bgm_channel: egret.SoundChannel
    private _bgmLoaded: boolean = false

    public static Instance() {
      if (SoundManager.instance == null) {
        SoundManager.instance = new SoundManager();
      }
      return SoundManager.instance;
    }

    public constructor() {
      super();
      this.onAddToStage();
    }

    /**
     * 加载音乐资源 
     */
    public onAddToStage(): void {
      const baseMusicHost =  'resource/assets/sound';

      this._click = new egret.Sound();
      this._click.load(`${baseMusicHost}/buttonclick.mp3`);
      this._bgm = new egret.Sound();
      this._bgm.load(`${baseMusicHost}/Music.mp3`);
      
      this._right = new egret.Sound();
      this._right.load(`${baseMusicHost}/right.mp3`);
      this._wrong = new egret.Sound();
      this._wrong.load(`${baseMusicHost}/wrong.mp3`);
      this._word = new egret.Sound();
      this._word.load(`${baseMusicHost}/type_word.mp3`);
    }

    /**
     * 开启播放背景音乐 
     */
    public PlayBGM(): void {
      if(this.IsMusic) {
        this._bgm.addEventListener(egret.Event.COMPLETE, () => {
          this._bgmLoaded = true;
          this._bgm_channel = this._bgm.play(0, 0);
          console.log('背景音乐加载完成');
        }, this);
        if (this._bgmLoaded) {
          this._bgm_channel = this._bgm.play(0, 0);
        }
      }
    }

    /**
     * 暂停播放 
     */
    public StopBGM(): void {
      if (this._bgm_channel !== null && this._bgmLoaded) this._bgm_channel.stop();
    }

    /**
     * 点击音效 
     */
    public PlayClick(): void {
      if (this.IsSound) this._click.play(0, 1);
    }

    /**
     * 猜对音效 
     */
    public PlayRight(): void {
      if (this.IsSound) this._right.play(0, 1);
    }

    /**
     * 猜错音效 
     */
    public PlayWrong(): void {
      if (this.IsSound) this._wrong.play(0, 1);
    }

    /**
     * 点击选择单字的音效 
     */
    public PlayWord(): void {
      if (this.IsSound) this._word.play(0, 1);
    }

    /**
     * 背景音乐是否播放,保存设置;  
     * 获取IsMusic拦截处理
     */
    public set IsMusic(value) {
      if (!value) { // 不能播放，本地存储ismusic:0
        console.log('Stop to Play BgMusic');
        egret.localStorage.setItem('isMusic', '0');
        this.StopBGM();
      } else { // 可以播放，本地存储ismusic: 1
        console.log('Ok to Play BgMusic');
        egret.localStorage.setItem('isMusic', '1');
        this.PlayBGM();
      }
    }

    /**
     * 背景音乐是否播放,保存设置; 
     * 设置IsMusic拦截处理
     */
    public get IsMusic(): boolean {
      let b = egret.localStorage.getItem('isMusic'); // 获取本地存储中背景音乐的播放状态
      if (b == null || b == '') {
        return true;
      } else {
        return b == '1';
      }
    }

    /**
     * 操作音效是否播放，保存设置 
     */
    /**
     * 获取IsSound拦截 
     */
    public set IsSound(value) {
      if (!value) {
        egret.localStorage.setItem('isSound', '0');
      } else {
        egret.localStorage.setItem('isSound', '1');
      }
    }

    /**
     * 操作音效是否播放，保存设置
     * 设置IsSound拦截 
     */
    public get IsSound(): boolean {
      const b = egret.localStorage.getItem('isSound');
      if (b == null || b == '') {
        return true;
      } else {
        return b == '1';
      }
    }
  }
}