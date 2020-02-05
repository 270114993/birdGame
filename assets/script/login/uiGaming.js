var engine = require('../web/MatchvsEngine');
var response = require('../web/MatchvsResponse');
var msg = require('../web/MatchvsMessage');
var GameData = require('../web/ExamplesData');
cc.Class({
    extends: cc.Component,

    properties: {
            exitButton:{
                type:cc.Button,
                default:null,
            },
            //倒计时Label
            countdownTimeLabel:cc.Label,
            //倒计时数字  为了在uiGaming更好修改数据
            countdownTime:cc.Integer,
    },

    onLoad () {
        createYellowChickenPrefab(this.node.parent);
        createBlueChickenPrefab(this.node.parent);
        
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStartCallback,this,true);
        //cc.log(this.node.getChildByName('exit'));
        this.exitButton.node.on('click',this.printf,this);

        this.initMatchvsEvent(this);

        //回合倒计时  先赋值  在定义一个计时器
        this.countdownTimeLabel.string = this.countdownTime;
        this.time = 0;
        //
        this.node.parent.getComponent('sound').playReadygoSound();
    },
    printf:function(){
        cc.log('printf');
        this.leaveRoom();
    },
    initMatchvsEvent(self){
        response.MatchvsResponse_three.prototype.bind_three();
        response.MatchvsResponse_three.prototype.init_three(self);
        this.node.on(msg.MATCHVS_SEND_EVENT_RSP,this.sendEventResponse,this);
        this.node.on(msg.MATCHVS_SEND_EVENT_NOTIFY,this.sendEventNotify,this);

        response.MatchvsResponse_two.prototype.init_two(self);
        response.MatchvsResponse_two.prototype.bind_two();
        this.node.on(msg.MATCHVS_LEAVE_ROOM,this.leaveRoomResponse,this);
    },
    start () {

    },
    onTouchStartCallback:function(){
        // cc.log(this.node.parent);
        //调用，并传入发送的消息\
        this.node.parent.getChildByName('yellowChicken').getComponent('yellowChicken').yellowChicken_Move = 1
        this.sendEvent(this.node.parent.getChildByName('yellowChicken').getComponent('yellowChicken').yellowChicken_Move);
        //小鸡跳的音效
        this.node.parent.getComponent('sound').playJumpSound();
    },
    //发送消息
    sendEvent(sendEventInfo){
            // var eventMsg = ['jjjj','kkkk','llll','aaaa'];
            // var msg = eventMsg[Math.floor(Math.random() * 10)];
            //发送我控制的小鸡动的信息
            var msg = sendEventInfo;//this.node.parent.getChildByName('yellowChicken').getComponent('yellowChicken').yellowChicken_Move = true;//发送的消息
            var result = engine.prototype.sendEvent(''+msg);//出问题了  前面不加会报错  ???
            // cc.log('you need use a:'+msg);

    },
    //发送消息回调
    sendEventResponse(sendEventRsp){
        if(sendEventRsp.status == 200){
            cc.log('发送消息成功');
        }
    },
    //其他人接受消息通知
    sendEventNotify(eventInfo){
        // cc.log('user:'+eventInfo.sreUserID + 'give you a'+eventInfo.cpProto);
        //cpProto   接收到的消息，即sendEvent中的msg
        //用switch语句来处理不同的消息
        switch(eventInfo.cpProto){
            case ''+1: this.node.parent.getChildByName('blueChicken').getComponent('blueChicken').blueChicken_Move = eventInfo.cpProto;//小鸡跳动
                break;
            case ''+2: this.node.parent.getChildByName('blueChicken').getComponent('blueChicken').spawnBullte = eventInfo.cpProto;//一个子弹的发射
                break;
        }
    },
    leaveRoom(){
        var result = engine.prototype.leaveRoom();
        cc.log(result + 'leaveRoom');
    },
    leaveRoomResponse(leaveRoomRsp){
        if(leaveRoomRsp.status == 200){
            cc.log('leaveRoom successed');
            this.hide();
            createUiReadyPrefab(this.node.parent);

        }
    },
    hide(){
        // cc.log(this.node.parent);
        this.node.parent.getChildByName('yellowChicken').destroy();
        this.node.parent.getChildByName('blueChicken').destroy();
        this.node.destroy();
    },
    update (dt) {
        //倒计时
        this.time +=dt;
        if(this.time >= 1){
            this.countdownTimeLabel.string = this.countdownTime--;
            this.time = 0;
        }
    },
});
