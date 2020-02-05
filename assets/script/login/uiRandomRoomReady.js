var engine = require('../web/MatchvsEngine');
var response = require('../web/MatchvsResponse');
var msg = require('../web/MatchvsMessage');
var GameData = require('../web/ExamplesData');

var gameInfo = require('../gameInformation');
cc.Class({
    extends: cc.Component,

    properties: {
        exitButton:{
            type:cc.Button,
            default:null,
        }
    },
    onLoad () {
        
        if(gameInfo.player1 == true){
            this.node.getChildByName('player1Image').getChildByName('image').active = true;
        }else if(gameInfo.player2 == true){
            this.node.getChildByName('player2Image').getChildByName('image').active = true;
        }
        this.exitButton.node.on('click',this.exit,this);
        this.initMatchvsEvent(this);
    },
    exit(){
        //this.showUiReady();
        //还要进行关闭房间的操作
        //cc.director.loadScene('login');
        this.leaveRoom();
        // this.node.destroy();
        // 过0.1秒销毁自身这个节点,这里不能用this.node.destroy(),会报错  要等leaveroom执行完   在销毁这个节点
        createUiReadyPrefab(this.node.parent);
        setTimeout(function(){
            this.node.destroy();
        }.bind(this),100)
        
    },
    //
    initMatchvsEvent(self){
        //这里为了和uiReady区别，如果一样的话，会报错，随机匹配回调，两个脚本引用同一个绑定会报错
        response.MatchvsResponse_two.prototype.init_two(self);
        response.MatchvsResponse_two.prototype.bind_two();
        this.node.on(msg.MATCHVS_LEAVE_ROOM,this.leaveRoomResponse,this);

        this.node.on(msg.MATCHVS_JOIN_ROOM_NOTIFY,this.joinRoomNotify,this);
        //
        this.node.on(msg.MATCHVS_LEAVE_ROOM_NOTIFY,this.leaveRoomNotify,this);

    },

    //
    showUiReady:function(){
        var uiReady = this.node.parent.getChildByName('uiReady');
        uiReady = uiReady.getComponent('uiReady');
        uiReady.show();
    },
    hide:function(){
        // this.node.active = false;
        this.node.destroy();
    },
    show:function(){
        this.node.active = true;
    },
    //关闭房间
    // joinOver(){
    //     var result = engine.prototype.joinOver();
    //     cc.log(result,'joinOver');
    // },
    leaveRoom(){
       var result = engine.prototype.leaveRoom();
       cc.log(result+'leaveRoom'); 
    },
    leaveRoomResponse(leaveRoomRsp){
        if(leaveRoomRsp.status == 200){
            cc.log('离开房间成功,房间的ID是'+leaveRoomRsp.roomID);
        }
    },
    //其他玩家进房通知
    joinRoomNotify(roomUserInfo){
        cc.log('加入房间的玩家ID是:'+roomUserInfo.userID);
        //其他玩家加入后开始游戏
        this.hide();
        createUiGamingPrefab(this.node.parent);
    },
    //其他玩家离开房间通知
    leaveRoomNotify(leaveRoomInfo){
        cc.log(leaveRoomInfo.userID+ '离开房间，房间Id是：'+ leaveRoomInfo.roomID);
    },
    update(){
        //cc.log(gameInfo.playerNum);
    },
});
