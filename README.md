# 番茄时钟
设置待完成任务，设定自定义时间，专注工作时间的。  
主要组成有： 统计专注时长，选择任务区，设置时间区，倒计时页面  
主要技术涉及：微信小程序
## 画圆形 
- 已知宽度是750rpx，使用 wx.getSystemInfoAsync()可以获取	windowWidth窗口宽度和windowHeight窗口高度。
750rpx / windowWidth = ?? / windowHeight 以它们的比率可以获得高度rpx

## 计时页和时钟页切换
用户点击开始专注这个按钮时切换到时钟页，当倒计时完成或用户点击 放弃 按钮，切换到计时页。这里都写进首页

## 遇到问题
css样式问题- 里面的div设置margin会影响到外层div，网上解决方法是
最外层div加个样式
- padding: 1px 但是有滚动条
- overflow:hidden 
- border: 1px solid #背景颜色 有滚动条