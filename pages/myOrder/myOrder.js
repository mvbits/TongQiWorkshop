// myOrder.js
var app = getApp();
Page({
  data: {
    domain: app.config.domain,
    tabInfo: [
      {tabName: '全部', tabStatus: 0},
      {tabName: '待支付', tabStatus: 1},
      {tabName: '待发货', tabStatus: 2},
      {tabName: '待收货', tabStatus: 3 },
      {tabName: '已完成', tabStatus: 4},
    ],
    orderList:[],
    currentId:0,
    loadMark:true,
    loadTip:"正在加载数据..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrderList();
  },

  //获取订单
  getOrderList:function(e){
    if(e){
      let id = e.currentTarget.dataset.status;
      this.setData({
        currentId: id
    })
    }

    var that = this;
    wx.request({
      url: that.data.domain + '/api/order/16777215/'+that.data.currentId+'',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        
        that.setData({
          orderList: res.data
        });
        if (that.data.orderList.length!=0){
          that.setData({
            loadMark: false
          });
        }else{
          that.setData({
            loadMark: true,
            loadTip: "暂时无对应的数据"
          });
        }
      },
      fail: function () {
        that.setData({
          loadMark: true,
          loadTip: "数据加载失败"
        });
      }
    });
  }
})