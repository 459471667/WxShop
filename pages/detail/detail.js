// pages/detail/detail.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var imgUrls = [];
var detailImg = [];
var goodsId = null;
var goods = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: true,
    showDialog: false,
    goods: null,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.goods.imgUrls // 需要预览的图片http链接列表  
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    goodsId = options.goodsId;
    //加载商品详情
    that.goodsInfoShow();
  },

  goodsInfoShow: function (success) {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'goods/getGoodsInfo?key=' + utils.key + '&goodsId=' + goodsId,
      success: data => {
        var goodsItem = data.result;
        for (var i = 0; i < goodsItem.shopGoodsImageList.length; i++) {
          imgUrls[i] = goodsItem.shopGoodsImageList[i].imgUrl;
        }
        var details = goodsItem.details.split(";");
        for (var j = 0; j < details.length; j++) {
          detailImg[j] = details[j];
        }
        goods = {
          imgUrls: imgUrls,
          title: goodsItem.name,
          price: goodsItem.price,
          privilegePrice: goodsItem.privilegePrice,
          detailImg: detailImg,
          imgUrl: goodsItem.imgUrl,
          buyRate: goodsItem.buyRate,
          goodsId: goodsId,
          count: 1,
          totalMoney: goodsItem.price,
        }

        that.setData({
          goods: goods
        })
        console.log(goods)
      }
    })
  },
  // 收藏
  addLike:function(){
    this.setData({
      isLike: !this.data.isLike
    })
    ajax.request({
      method:'GET',
      url: 'collection/addShopCollection?key=' + utils.key + '&goodsId=' + goodsId,
      success: data=>{
        console.log(data)
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 2000
        });
      }
    })
  },
  // 立即购买-待开发
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  // 跳到购物车-待开发
  toCar() {
    console.log('购物车')
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  /**
   * sku 弹出
   */
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function () {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  /* 减数 */
  delCount: function (e) {
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count;
    // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function (e) {
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    // 商品总数量-1  
    if (count < 10) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function (e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /**
   * 加入购物车
   */
  addCar: function (e) {
    var that = this;
    var count = this.data.goods.count;
    ajax.request({
      method: 'GET',
      url: 'carts/addShopCarts?key=' + utils.key + '&goodsId=' + goodsId + '&num=' + count,
      success: data => {
        console.log("加入购物车返回结果：" + data.message)
        that.closeDialog();
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        });
      }
    })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})