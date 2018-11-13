// pages/home/home.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var sectionData = [];
var ifLoadMore = null;
var page = 1;//默认第一页

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbars: null,
    currentTab: 0,
    banners: null,
    indicatorDots:true,
    autoplay:true,
    interval: 3000,
    duration: 1000,
    menus: null,
    brands: null,
    hidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //加载navbar导航条
    that.navbarShow();
    that.bannerShow();
    that.menuShow();
    that.brandShow();
    //加载福利专场
    that.newGoodsShow();
  },

  // 导航条方法
  navbarShow:function(success){
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/navBar?key=' + utils.key,
      success: data =>{
        that.setData({
          navbars:data.result
        })
      }
    })
  },
  // 轮播图方法
  bannerShow:function(){
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/banners?key=' + utils.key,
      success: data =>{
        that.setData({
          banners: data.result
        })
      }
    })
  },
  // memu分类
  menuShow:function(){
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'home/menus?key=' + utils.key,
      success: data =>{
        that.setData({
          menus: data.result
        })
      }
    })
  },
  // 特卖
  brandShow:function(){
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'activity/brands?key=' + utils.key + '&type=temai&page=1&size=5',
      success: data => {
        that.setData({
          brands: data.result.list
        })
      }
    })
  },
  // 福利专场
  newGoodsShow: function(success){
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'goods/getHotGoodsList?key=' + utils.key + '&page=' + page + '&size=10',
      success: data => {
        var newGoodsData = data.result.list;
        page += 1;
        if (ifLoadMore) {
          //加载更多
          if (newGoodsData.length > 0) {
            console.log(newGoodsData)
            //日期以及title长度处理
            for (var i in newGoodsData) {
              //商品名称长度处理
              var name = newGoodsData[i].name;
              if (name.length > 26) {
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            sectionData['newGoods'] = sectionData['newGoods'].concat(newGoodsData);

          } else {
            ifLoadMore = false;
            this.setData({
              hidden: true
            })
            wx.showToast({
              title: '暂无更多内容！',
              icon: 'loading',
              duration: 2000
            })

          }
        }else{
          if (ifLoadMore == null) {
              ifLoadMore = true;

            //日期以及title长度处理
            for (var i in newGoodsData) {
              //商品名称长度处理
              var name = newGoodsData[i].name;
              if (name.length > 26) {
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            sectionData['newGoods'] = newGoodsData;//刷新
          }

        }
        that.setData({
          newGoods: sectionData['newGoods'],
        });
        wx.stopPullDownRefresh();//结束动画
      }
    })
  },

  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    //新增商品用户点击数量
    that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
  },
  goodsClickShow(goodsId) {
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'goods/addGoodsClickRate?key=' + utils.key + '&goodsId=' + goodsId,
      success: data => {
        console.log("用户点击统计返回结果：" + data.message)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉");
    var that = this;
    console.log('加载更多');
    if (ifLoadMore != null) {
      that.newGoodsShow();

    }
  },

  navbarTap:function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})