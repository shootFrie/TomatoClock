// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    time: '5',
    rate: '',
    clockShow: false,
    // windowHeight: 0, // 窗口高度
   cateList:[
     {
       title: '工作',
       icon: 'gongzuo'
     }, {
      title: '学习',
      icon: 'xuexishuben'
    }, {
      title: '思考',
      icon: 'a-sikaoyihuo-01'
    }, {
      title: '写作',
      icon: 'xiezuo'
    }, {
      title: '运动',
      icon: 'yundonghuwaileimu'
    }, {
      title: '阅读',
      icon: 'yuedu'
    }
   ],
   cateActive: "0"
  },
  // 滑动组件
  handleSliderChange(e){
    console.log(e.detail.value);
    this.setData({
      time: e.detail.value
    })
  },
  // 任务选中
  handleCateClick(e){
    console.log("点击选中下标",e.currentTarget.dataset.index);
    this.setData({
      cateActive: e.currentTarget.dataset.index
    })
  },
  onLoad() {
    var that = this;
    // 获取设备信息
    wx.getSystemInfoAsync({
      success (res) {
        console.log(res);
        // 宽度750rpx
        var rate = 750 / res.windowWidth * res.windowHeight;
        that.setData({
          rate,
          // windowHeight: res.windowHeight
        })
      }
    });
  },
  // 开始专注
  startClick(){
    this.setData({
      clockShow: !this.data.clockShow
    })
    this.drawBg();
  },
  // 画圆
  // drawBg(){
  //   var lineWidth = 6 / this.data.rate; // 线条转化为px
  //   // 通过 SelectorQuery 获取 Canvas 节点
  //   wx.createSelectorQuery()
  //   .select('#progress_bg') // 在 WXML 中填入的 id
  //   .fields({ node:true, size: true})
  //   // .node(({ node: canvas }) => { })
  //   .exec(res => {
  //     console.log(res[0])
  //     // Canvas 对象
  //     const canvas = res[0].node;
  //     // 渲染上下文
  //     const ctx = canvas.getContext('2d'); 
  //     const dpr = wx.getSystemInfoSync().pixelRatio
  //     canvas.width = res[0].width * dpr
  //     canvas.height = res[0].height * dpr
  //     ctx.scale(dpr, dpr)
  //     // ctx.lineWidth = lineWidth; // 线条
  //     // ctx.strokeStyle = "#000"; // 颜色
  //     // ctx.lineCap = 'round'; // 圆
  //     // ctx.beginPath();
  //     // ctx.arc(400/this.data.rate/2, 400/this.data.rate/2, 400/this.data.rate /2 *lineWidth, 0, 2*Math.PI, false);
  //     // ctx.stroke();
  //     ctx.scale(dpr, dpr)
  //     ctx.lineCap='round'
  //     ctx.lineWidth="lineWidth"
  //     ctx.beginPath()
  //     ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,false)
  //     ctx.strokeStyle ="#000000"
  //     ctx.stroke()
  //   })
  // },
  drawBg: function() {
    const lineWidth = 6 / this.data.rate;//px
    const query = wx.createSelectorQuery()
    query.select('#progress_bg')
        .fields({ node:true, size: true})
        .exec((res) => {
           const canvas = res[0].node
           const ctx = canvas.getContext('2d')
           const dpr = wx.getSystemInfoSync().pixelRatio
           canvas.width = res[0].width * dpr
           canvas.height = res[0].height * dpr
           ctx.scale(dpr, dpr)
           ctx.lineCap='round'
           ctx.lineWidth="lineWidth"
           ctx.beginPath()
           ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,true);
           ctx.strokeStyle ="#000000"
           ctx.stroke()
        })
},
})
