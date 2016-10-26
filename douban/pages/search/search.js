var config = require( '../../config.js' )
var app = getApp();
Page( {
    data: {
        searchInfo: [],
        hidden: true,
        page: 0,
        size: 20,
        sum: 0,
        loading: true,
        hasMore: true,
        subtitle: '加载中...',
        movies: [],
        defaultLoad: true,
        loadWord: "点击加载更多...",
        q: ""
    },
    scroll: function( e ) {
        console.log( e )
    },
    loadmore: function(q) {
        var that = this;
        if( !that.data.hasMore ) return;
        that.setData( { subtitle: '加载中...', loading: true, loadWord: "加载中..." });
        wx.request( {
            url: config.APIUrl()[ 'API_URL_SEARCH' ],
            data: {
                q: q,
                tag: "",
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
                        searchInfo: that.data.searchInfo.concat( res.data.subjects ),
                        //searchInfo: res.data.subjects ,
                        loading: false,
                        defaultLoad: false,
                        loadWord: "点击加载更多...",
                        page: parseInt( that.data.page ) + parseInt( res.data.subjects.length )
                    });
                    console.log( that.data.searchInfo );
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
    onLoad: function( options ) {
        var that = this;
        var id = options.q;
        that.setData( {
            hidden: false,
            q: id
        });
        that.loadmore(id);
    },
    onPullDownRefresh: function() {
        console.log( 1 );
        this.setData( { movies: [], page: 1 })
        this.loadmore(this.data.q);
    },
    bindScrollBottom: function( e ) {
        this.loadmore(this.data.q);
    }
});