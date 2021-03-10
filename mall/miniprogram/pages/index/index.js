// 引入封装的promise  路径要补全
import { request } from "../../request/index.js"
//Page 首页
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    headList:[]
  },
  //界面开始加载就会触发
  onLoad: function (options) {
    // 1 发送异步请求，获取轮播图
    this.getSwiperList();
    // 2 发送异步请求，获取导航图
    this.getHeadList()


  },

  getSwiperList(){
    //获取轮播图
    let apiKey = "JZK5Rpx792bc39041d7461594b1302746725382f30af5df"
    request({ url: 'https://api.apishop.net/common/jieqi/Get24Jieqi?apiKey='})
      .then(result => {
        result = [
          {
            "jieqiid": 1,
            "name": "立春",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_lc.png",
            "time": "2017-02-03 23:34:01"
          },
          {
            "jieqiid": 2,
            "name": "雨水",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_ys.png",
            "time": "2017-02-18 19:31:16"
          },
          {
            "jieqiid": 3,
            "name": "惊蛰",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_jz.png",
            "time": "2017-03-05 17:32:40"
          },
          {
            "jieqiid": 4,
            "name": "春分",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_cf.png",
            "time": "2017-03-20 18:28:35"
          },
          {
            "jieqiid": 5,
            "name": "清明",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_qm.png",
            "time": "2017-04-04 22:17:16"
          },
          {
            "jieqiid": 6,
            "name": "谷雨",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_gy.png",
            "time": "2017-04-20 05:26:58"
          },
          {
            "jieqiid": 7,
            "name": "立夏",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_lx.png",
            "time": "2017-05-05 15:30:59"
          },
          {
            "jieqiid": 8,
            "name": "小满",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_xm.png",
            "time": "2017-05-21 04:30:53"
          },
          {
            "jieqiid": 9,
            "name": "芒种",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_mz.png",
            "time": "2017-06-05 19:36:33"
          },
          {
            "jieqiid": 10,
            "name": "夏至",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_xz.png",
            "time": "2017-06-21 12:24:06"
          },
          {
            "jieqiid": 11,
            "name": "小暑",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_xs.png",
            "time": "2017-07-07 05:50:38"
          },
          {
            "jieqiid": 12,
            "name": "大暑",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_ds.png",
            "time": "2017-07-22 23:15:18"
          }
        ]
        this.setData({
          swiperList: result
        })
      })
  },
  getHeadList(){
    // 获取导航图
    let apiKey = "JZK5Rpx792bc39041d7461594b1302746725382f30af5df"
    request({ url: 'https://api.apishop.net/common/jieqi/Get24Jieqi?apiKey='})
      .then(result => {
        result = [
          {
            "jieqiid": 1,
            "name": "立春",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_lc.png",
            "time": "2017-02-03 23:34:01"
          },
          {
            "jieqiid": 2,
            "name": "雨水",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_ys.png",
            "time": "2017-02-18 19:31:16"
          },
          {
            "jieqiid": 3,
            "name": "惊蛰",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_jz.png",
            "time": "2017-03-05 17:32:40"
          },
          {
            "jieqiid": 4,
            "name": "春分",
            "pic": "http://apistore.data.eolinker.com/jieqi_logo/jieqi_cf.png",
            "time": "2017-03-20 18:28:35"
          }
        ]
        this.setData({
          headList: result
        })
      })
  }
});
