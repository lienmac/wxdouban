var config = require( '../../config.js' )
var app = getApp();
Page( {
    data: {
        itemInfo: {},
        hidden: true
    },
    onLoad: function( options ) {
        var that = this;
        var id = options.id;
        that.setData( {
            hidden: false
        });
        wx.request( {
            url: config.APIUrl()[ 'API_URL_SUBJECT' ] + id,
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                console.log( res.data );
                that.setData( {
                    hidden: true,
                    itemInfo: res.data
                });
            }
        })
    }
});