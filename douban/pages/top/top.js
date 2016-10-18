var config = require( '../../config.js' )
var app = getApp();
Page( {
    data: {
        itemInfo: [],
        hidden: true,
        sum: 0,
        loading: true,
        hasMore: true,
        page: "0",
        size: 20,
        subtitle: '加载中...',
        movies: [],
        defaultLoad: true,
        loadWord: "点击加载更多..."
    },

    scroll: function( e ) {
        console.log( e )
    },
    loadmore: function() {
        var that = this;
        if( !that.data.hasMore ) return;
        that.setData( { subtitle: '加载中...', loading: true, loadWord: "加载中..." });
        wx.request( {
            url: config.APIUrl()[ 'API_URL_TOP250' ],
            data: {
                start: that.data.page,
                count: that.data.size
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                if( res.data.subjects.length ) {
                    that.setData( {
                        hidden: true,
                        itemInfo: that.data.itemInfo.concat( res.data.subjects ),
                        loading: false,
                        defaultLoad: false,
                        loadWord: "点击加载更多...",
                        page: parseInt( that.data.page ) + parseInt( res.data.subjects.length )
                    });
                    console.log( that.data.itemInfo );
                } else {
                    that.setData( { hasMore: false, loading: false })
                }

            }
        })
    },
    //列表点击跳转
    bindTapItem: function( e ) {
        wx.navigateTo( {
            url: '../item/item?id=' + e.currentTarget.dataset.id
        })
    },
    onLoad: function() {
        var that = this;
        that.setData( {
            hidden: false
        });
        that.loadmore();

    },
    onPullDownRefresh: function() {
        console.log( 1 );
        this.setData( { movies: [], page: 1 })
        this.loadmore();
    },
    bindScrollBottom: function( e ) {
        this.loadmore();
    }
});