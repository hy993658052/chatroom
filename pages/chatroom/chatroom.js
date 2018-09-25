//index.js
//获取应用实例
const app = getApp()

// pages/chatroom/chatroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userin: 'hy进入聊天室',
    messages: '',
    userInfo: {},
    items: [],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //用户进入
    this.onAddu();
    var item = this.data.items;
    item.push({
      nickName: this.data.userInfo.nickName,
      type: '2'
    });
    this.setData({
      items: item,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.onAddo();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //加载历史记录
    this.onQuery();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  besend: function(e){
    this.data.messages = e.detail.value;
  },

  sendmessage: function(e){
    var item = this.data.items;
    item.push({
      avatarUrl: this.data.userInfo.avatarUrl,
      message: this.data.messages,
      nickName: this.data.userInfo.nickName,
      type: '1'
    });
    this.setData({
      items: item,
      messages: ''
    });
    this.onAddm();
  },

  onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counters').get({
      success: res => {
        this.setData({
          items: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onAddm: function () {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        avatarUrl: this.data.userInfo.avatarUrl,
        message: this.data.messages,
        nickName: this.data.userInfo.nickName,
        type: '1'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '发送信息成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onAddu: function () {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        nickName: this.data.userInfo.nickName,
        type: '2'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onAddo: function () {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        nickName: this.data.userInfo.nickName,
        type: '3'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})