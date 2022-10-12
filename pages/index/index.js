// index.js
// 获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const {cateList} = require('../../utils/constant.js')
Page({
  data: {
    timeStr: '05:00',
    time: '5', // 存储分钟
    rate: '',
    clockShow: false,
    // windowHeight: 0, // 窗口高度
    mTime: 300000, // 存储毫秒，默认值
    cateList: cateList,
    cateActive: "0",
    pauseShow: false,
    timer: null, // 定时器
  },
  // 滑动组件
  handleSliderChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 任务选中
  handleCateClick(e) {
    console.log("点击选中下标", e.currentTarget.dataset.index);
    this.setData({
      cateActive: e.currentTarget.dataset.index
    })
  },
  onLoad() {
    var that = this;
    // 获取设备信息
    wx.getSystemInfoAsync({
      success(res) {
        console.log(res);
        // 宽度750rpx
        var rate = 750 / res.windowWidth;
        that.setData({
          rate,
          // windowHeight: res.windowHeight
        })
      }
    });
  },
  // 开始专注
  startClick() {
    this.setData({
      // pauseShow: false,
      clockShow: !this.data.clockShow,
      mTime: this.data.time * 60 * 1000, // 分转化毫秒
      timeStr: (this.data.time < 10 ? '0' + this.data.time : this.data.time) + ":00",
    })
    this.drawBg();
    this.drawActive();
  },
  // 画圆
  drawBg() {
    var lineWidth = 6 / this.data.rate; // 线条转化为px
    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#progress_bg') // 在 WXML 中填入的 id
      .fields({
        node: true,
        size: true
      })
      // .node(({ node: canvas }) => { })
      .exec(res => {
        console.log(res[0])
        // Canvas 对象
        const canvas = res[0].node;
        // 渲染上下文
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.lineCap = 'round'
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        console.log(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, canvas)
        ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false)
        ctx.strokeStyle = "#000000"
        ctx.stroke()
      })
  },
  // 画运动圆环
  drawActive() {
    var timer = setInterval(() => {
      /*
      画图从1.5 到3.5
      PI 从0 2 
      假设mTime 300000 ，100毫秒执行一次，要执行3000
      角度2/3000
      */
      // 角度
      let angle = 1.5 + 2 * (this.data.time * 60 * 1000 - this.data.mTime) / (this.data.time * 60 * 1000);
      let currentTime = this.data.mTime - 100;
      this.setData({
        mTime: currentTime
      })
      if (angle < 3.5) {
        if (currentTime % 1000 == 0) {
          let sec = currentTime / 1000; // 秒
          let min = parseInt(sec / 60); // 分
          sec = sec - min * 60;
          sec = sec < 10? '0' + sec : sec;
          min = min < 10 ? '0' + min: min;
          this.setData({
            timeStr: min + ':' + sec
          })
        }
        let lineWidth = 6 / this.data.rate; // 线条转化为px
        // 通过 SelectorQuery 获取 Canvas 节点
        wx.createSelectorQuery()
          .select('#progress_active') // 在 WXML 中填入的 id
          .fields({
            node: true,
            size: true
          })
          // .node(({ node: canvas }) => { })
          .exec(res => {
            // console.log(res[0])
            // Canvas 对象
            const canvas = res[0].node;
            // 渲染上下文
            const ctx = canvas.getContext('2d');
            const dpr = wx.getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)
            ctx.lineCap = 'round'
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false)
            // 右下1/4圆
            // ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,0.5*Math.PI,false)
            ctx.strokeStyle = "#fff"
            ctx.stroke()
          })
      } else {
        // 倒计时结束
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift({
          date: util.formatTime(new Date),
          cate: this.data.cateActive, // 类型
          time: this.data.time // 时长
        })
        wx.setStorageSync('logs', logs)
        console.log('this.data.clockShow',this.data.clockShow)
        this.setData({
          timeStr: "00:00",
          clockShow: !this.data.clockShow,
        })
        clearInterval(timer);
      }
    }, 100); // 越短越流畅
    this.setData({timer})
  },
  pause(){
    clearInterval(this.data.timer);
    this.setData({pauseShow: true})
  },
  continue(){
    this.drawActive()
    this.setData({pauseShow: false})
  },
  cancle(){
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: false,
      clockShow: !this.data.clockShow,
    })
  },
  ok(){
     // 倒计时结束
     var logs = wx.getStorageSync('logs') || [];
     logs.unshift({
       date: util.formatTime(new Date),
       cate: this.data.cateActive, // 类型
       time: this.data.time // 时长
     })
     wx.setStorageSync('logs', logs)
    this.setData({
      clockShow: !this.data.clockShow,
    })
  }
})