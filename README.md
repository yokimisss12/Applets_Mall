# Applets_Mall
# Hello Mall

# 云函数示HTML示例
  <!-- 用户 openid -->
  <view class="userinfo">
    <button 
      open-type="getUserInfo" 
      bindgetuserinfo="onGetUserInfo"
      class="userinfo-avatar"
      style="background-image: url({{avatarUrl}})"
      size="default"
    ></button>
    <view class="userinfo-nickname-wrapper">
      <button class="userinfo-nickname" bindtap="onGetOpenid">点击获取 openid</button>
    </view>
  </view>


  <!-- 上传图片 -->
  <view class="uploader">
    <view class="uploader-text" bindtap="doUpload">
      <text>上传图片</text>
    </view>
    <view class="uploader-container" wx:if="{{imgUrl}}">
      <image class="uploader-image" src="{{imgUrl}}" mode="aspectFit" bindtap="previewImg"></image>
    </view>
  </view>


  <!-- 操作数据库 -->
  <view class="uploader">
    <navigator url="../databaseGuide/databaseGuide" open-type="navigate" class="uploader-text">
      <text>前端操作数据库</text>
    </navigator>
  </view>

  <!-- 即时通信 -->
  <view class="uploader">
    <navigator url="../im/im" open-type="navigate" class="uploader-text">
      <text>即时通信 Demo</text>
    </navigator>
  </view>

  <!-- 新建云函数 -->
  <view class="uploader">
    <navigator url="../addFunction/addFunction" open-type="navigate" class="uploader-text">
      <text>快速新建云函数</text>
    </navigator>
  </view>

  <!-- 云调用 -->
  <view class="uploader">
    <navigator url="../openapi/openapi" open-type="navigate" class="uploader-text">
      <text>云调用</text>
    </navigator>
  </view>

# 云函数js示例
//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})

# 云函数样式示例
/**index.wxss**/

page {
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.userinfo, .uploader, .tunnel {
  margin-top: 40rpx;
  height: 140rpx;
  width: 100%;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 300ms ease;
}

.userinfo {
  padding-left: 120rpx;
}

.userinfo-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx;
  border-radius: 50%;
  background-size: cover;
  background-color: white;
}

.userinfo-avatar[size] {
  width: 100rpx;
}


.userinfo-avatar:after {
  border: none;
}

.userinfo-nickname {
  font-size: 32rpx;
  color: #007aff;
  background-color: white;
  background-size: cover;
  text-align: left;
  padding-left: 0;
  margin-left: 10px;
}

.userinfo-nickname::after {
  border: none;
}

.userinfo-nickname-wrapper {
  flex: 1;
}

.uploader, .tunnel {
  height: auto;
  padding: 0 0 0 40rpx;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.uploader-text, .tunnel-text {
  width: 100%;
  line-height: 52px;
  font-size: 34rpx;
  color: #007aff;
}

.uploader-container {
  width: 100%;
  height: 400rpx;
  padding: 20rpx 20rpx 20rpx 0;
  display: flex;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.uploader-image {
  width: 100%;
  height: 360rpx;
}

.tunnel {
  padding: 0 0 0 40rpx;
}

.tunnel-text {
  position: relative;
  color: #222;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.tunnel-text:first-child {
  border-top: none;
}

.tunnel-switch {
  position: absolute;
  right: 20rpx;
  top: -2rpx;
}

.disable {
  color: #888;
}

.service {
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  background: linear-gradient(#007aff, #0063ce);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-content: center;
  justify-content: center;
  transition: all 300ms ease;
}

.service-button {
  position: absolute;
  top: 40rpx;
}

.service:active {
  box-shadow: none;
}

.request-text {
  padding: 20rpx 0;
  font-size: 24rpx;
  line-height: 36rpx;
  word-break: break-all;
}
