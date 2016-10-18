//index.js
//获取应用实例
var config = require( '../../config.js' )
var app = getApp()
Page( {
  data: {
    motto: 'Hello World',
    userInfo: {},
    tabOption: [
      {
        url: 'API_URL_IN',
        word: '正在上映',
        current: '0'
      },
      {
        url: 'API_URL_COMING',
        word: '即将上映',
        current: '1'
      }
    ],
    indexSwiper: {
      imgUrl: [
        'http://mat.51xuanxiao.com/mobile/images/home/20160727-banner-1.jpg',
        'http://mat.51xuanxiao.com/mobile/images/home/20160727-banner-2.jpg',
        'http://mat.51xuanxiao.com/mobile/images/home/20160727-banner-3.jpg'
      ],
      imgRedirect: [
        'http://www.baidu.com',
        'http://www.qq.com',
        'http://www.sina.com.cn'
      ],
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000
    },
    listData: {},
    hidden: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  //轮播点击事件
  bindTapImgRedirect: function( e ) {
    var tab = e.currentTarget.id.split( "swiper-" )[ 1 ];
    wx.navigateTo( {
      url: this.data.indexSwiper.imgRedirect[ tab ]
    })
  },
  //tab点击事件
  bindTapIndex: function( e ) {
    if( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      var that = this;
      that.setData( {
        hidden: false,
        currentTab: e.target.dataset.current
      });
      wx.request( {
        url: config.APIUrl()[ e.target.dataset.url ],
        data: {
          city: '厦门'
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function( res ) {
          that.setData( {
            hidden: true,
            listData: res.data.subjects
          })
        }
      });

    }
  },
  //列表点击跳转
  bindTapItem: function( e ) {
    wx.navigateTo( {
      url: '../item/item?id=' + e.currentTarget.dataset.id
    })
  },
  //默认输出数据
  defaultOutput: function() {
    var that = this;
    that.setData( {
        hidden: false
      });
    wx.request( {
      url: config.APIUrl()[ 'API_URL_IN' ],
      data: {
        city: '厦门'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        that.setData( {
          hidden: true,
          listData: res.data.subjects
        })
      }
    });
  },
  onLoad: function() {
    this.defaultOutput();
  }
})
