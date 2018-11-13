// pages/classify/classify.js
const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyItems:[],
    curNav:1,
    curIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.classifyShow();
  },
  // 获取左边Item
  classifyShow:function(){
    var that = this;
    ajax.request({
      method:'GET',
      url:'classify/getShopClassifyList?key='+utils.key+'&page=1&size=10',
      success:data=>{
        console.log(data.result)
        that.setData({
          classifyItems: data.result
        })
        
      }
    })
  },

  switchRightTab:function(e){
    let id = e.target.dataset.id,
        index = parseInt(e.target.dataset.index);
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

})