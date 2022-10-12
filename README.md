# 番茄时钟
设置待完成任务，设定自定义时间，专注工作时间的。  
主要组成有： 统计专注时长，选择任务区，设置时间区，倒计时页面  
主要技术涉及：微信小程序

## 计时页和时钟页切换
用户点击开始专注这个按钮时切换到时钟页，当倒计时完成或用户点击 提前结束 按钮或用户点击 暂停 按钮再点击 放弃 按钮，切换到计时页
用户点击暂停可以显示 继续 和 放弃 按钮。时间完成会直接跳转到计时页

## 时钟
进度条圆：逆时针270度开始( 0.5*Math.PI=90度 ,1.5*Math.PI=270度)
<img src='./canvas_arc.jpg' align='left'/>

## 画圆形 
- 已知宽度是750rpx，使用 wx.getSystemInfoAsync()可以获取	windowWidth窗口宽度和windowHeight窗口高度。
750rpx / windowWidth = ?? / windowHeight 以它们的比率可以获得高度rpx

## 统计
统计页面
- 今日累计次数，历史累计次数、今日专注时长、累计专注时长
- 分类统计 
  - 完成时间、完成类型、专注时间
用storage在计时结束进行logs存储本地，在统计页获取并显示


## 遇到问题
css样式问题- 里面的div设置margin会影响到外层div，解决方法是
最外层div加个样式
- padding: 1px 但是有滚动条
- overflow:hidden 
- border: 1px solid #背景颜色 有滚动条

- canvas新版和wx.createCanvasContext 
  - ctx.arc(圆心x坐标, 圆心y坐标, 圆半径, 起始弧度, 是否逆时针)

- 在计时页点击统计会有计时报错的问题