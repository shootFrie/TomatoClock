// logs.js
const util = require('../../utils/util.js')
const {cateList} = require('../../utils/constant.js')
Page({
  data: {
    sum: [{
      title: '今日番茄次数',
      val: 0
    },{
      title: '累计番茄次数',
      val: 0
    },{
      title: '今日专注时长',
      val: 0
    },{
      title: '累计专注时长',
      val: 0
    },],
    logs: [],
    timeList: [],
    dayList: [], // 当天分类
    history: [], // 历史
    activeIndex: 0, // 分类统计切换
  },
  onShow() {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return {
    //       date: util.formatTime(new Date(log)),
    //       timeStamp: log
    //     }
    //   })
    // })
    let logs = wx.getStorageSync('logs') || [];
    console.log(logs, util.formatTime(new Date))
    if(logs.length) {
      let day = 0; // 今日番茄次数
      let total = logs.length; 
      let  dayTime = 0;
      let totalTime = 0; // 累计专注时长
      let dayList = []; // 今日分类
      let history = []; // 历史 
      let today = util.formatTime(new Date).substr(0,10);
      for(let log of logs) {
        if (log.date.substr(0,10) === today) {
          day++;
          dayTime += parseInt(log.time);
          dayList.push({
            date: log.date,
            cate: cateList[log.cate].title,
            time: parseInt(log.time) > 60 ? `${parseInt(parseInt(log.time) / 60) }时 ${parseInt(log.time) % 60} 分钟` : `${parseInt(log.time)} 分钟` 
          })
        }
        totalTime += parseInt(log.time);
        history.push({
          date: log.date,
          cate: cateList[log.cate].title,
          time: parseInt(log.time) > 60 ? `${parseInt(parseInt(log.time) / 60) }时 ${parseInt(log.time) % 60} 分钟` : `${parseInt(log.time)} 分钟` 
        })
      }
      this.setData({
        'sum[0].val': day + '次',
        'sum[1].val': total + '次',
        'sum[2].val': dayTime > 60 ? `${parseInt(dayTime / 60) }时 ${dayTime % 60} 分钟` : `${dayTime} 分钟`,
        'sum[3].val': totalTime > 60 ? `${parseInt(totalTime / 60) }时 ${totalTime % 60} 分钟` : `${totalTime} 分钟`,
        dayList,
        history,
        list : dayList
      })
    }
  },
  changeType(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index; // 注意这里拿到的是字符串
    let list = [];
    if(index == 0) {
      list= this.data.dayList
    } else if(index == 1){
      list= this.data.history
    }
    this.setData({
      activeIndex: index,
      list
    })
  }
})
