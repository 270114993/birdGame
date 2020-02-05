var engine = require('../web/MatchvsEngine');
var response = require('../web/MatchvsResponse');
var msg = require('../web/MatchvsMessage');
var GameData = require('../web/ExamplesData');
cc.Class({
    extends: cc.Component,

    properties: {
       startButton:cc.Button,
    },

    onLoad () {
        this.startButton.node.on('click',this.init,this);
        //调用对应的事件监听,    
        this.initMatchvsEvent(this);
        //定义一个已经初始化了
        //this.hadinit = false;
        //this.hadlogin = false;
    },
    //注册对应的事件监听和差自己的原型传递进入,用于发送事件使用
    initMatchvsEvent(self){
        response.MatchvsResponse.prototype.bind();
        response.MatchvsResponse.prototype.init(self);
        // response.prototype.bind();
        // response.prototype.init(self);
        this.node.on(msg.MATCHVS_INIT,this.initResponse,this);
        this.node.on(msg.MATCHVS_REGISTER_USER,this.registerResponse,this);
        this.node.on(msg.MATCHVS_LOGIN,this.loginResponse,this);
        //
        //this.node.on(msg.MATCHVS_JOIN_ROOM_RSP,this.joinRoomResponse,this);
    },
    //移除监听
    removeEvent(){
        this.node.off(msg.MATCHVS_INIT,thsi.initResponse,this);
        this.node.off(msg.MATCHVS_REGISTER_USER,this.registerResponse,this);
        this.node.off(msg.MATCHVS_LOGIN,this.loginResponse,this);
    },
    init(){
        //判断是否初始化了
        // if(this.hadinit){
        //     this.hide();
        //     var uiReady = this.node.parent.getChildByName('uiReady');
        //     uiReady = uiReady.getComponent('uiReady');
        //     uiReady.show();
        // }else{
        //     var result = engine.prototype.init(GameData.channel,GameData.platform,GameData.gameID,GameData.appKey);
        // }
        var result = engine.prototype.init(GameData.channel,GameData.platform,GameData.gameID,GameData.appKey);
    },
    //初始化回调,回调成功后进行注册
    initResponse(status){
        if(status == 200){
            cc.log('初始化成功,status:'+status);
            var result = engine.prototype.registerUser();
        }else{
            cc.log('初始化失败,status:'+status);
        }
    },
    //注册回调,回调成功后进行登录
    registerResponse(userInfo){
        if(userInfo.status == 0){
            cc.log('注册回调成功');
            cc.log('注册用户成功,ID:'+userInfo.id + 'token:'+ userInfo.token+'name:'+userInfo.name+'avatar:'+userInfo.avator);
            GameData.userID = userInfo.id;
            GameData.token = userInfo.token;
            GameData.userName = userInfo.name;
            var result = engine.prototype.login(GameData.userID, GameData.token);
        }else{
            cc.log('注册用户失败');
        }
    },
    //登录回调,回调成功后隐藏UILogin这个界面,创建UIReady这个界面,把hadinit改为true,代表已经初始化过了
    loginResponse(MsloginRsp){
        if(MsloginRsp.status == 200){
            cc.log('登录回调成功');
            //测试随机匹配
            //var result = engine.prototype.joinRandomRoom(GameData.mxaNumer);
            this.hide();
            //创建UiReady这个界面
            createUiReadyPrefab(this.node.parent);
            //this.hadinit = true;
        }else{
            cc.log('登录失败:');
        }
    },
    // joinRoomResponse(status){
    //     if(status == 200){
    //         cc.log('huidiaochenggong:')
    //     }
    // },
    hide:function(){
        // this.node.active = false;
        // cc.log('隐藏成功.');
        //我选择销毁节点  而不是隐藏节点了   隐藏会占内存
        this.node.destroy();
    },
    show:function(){
        // this.node.active = true;
        //不需要再这里城建了   再UIReady界面创建
        createUiLoginPrefab(this.node);
    }

});
