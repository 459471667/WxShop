// pages/home/home.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //加载navbar导航条
    that.navbarShow();
    that.bannerShow();
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
        console.log(data.result)
      }
    })
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