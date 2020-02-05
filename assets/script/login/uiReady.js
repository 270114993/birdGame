var engine = require('../web/MatchvsEngine');
var response = require('../web/MatchvsResponse');
var msg = require('../web/MatchvsMessage');
var GameData = require('../web/ExamplesData');

var gameInfo = require('../gameInformation');
cc.Class({
    extends: cc.Component,

    properties: {
       exitButton:cc.Button,
       randomRoomButton:cc.Button,
       createRoomButton:cc.Button,
       joinRoomButton:cc.Button,
    },
    onLoad () {
        //设置user的image和用户名
        this.node.getChildByName('user').getChildByName('playerImage').active = false;
        this.node.getChildByName('user').getChildByName('playerName').getComponent(cc.Label).string = GameData.userID;//1. 拖入该label,label.string修改文本内容,2.通过代码获取到该label节点,然后获得label组件

        this.exitButton.node.on('click',this.exit,this);

        //
        this.randomRoomButton.node.on('click',this.joinRandomRoom,this);

        //
        this.initMatchvsEvent(this);
    },
    initMatchvsEvent(self){
        //当有两个脚本同时引用了同一个绑定的，第二次调用时会报错，所以每个脚本各写一个绑定的
        response.MatchvsResponse_one.prototype.init_one(self);
        response.MatchvsResponse_one.prototype.bind_one();
        this.node.on(msg.MATCHVS_JOIN_ROOM_RSP,this.joinRoomResponse,this);
        
    },
//返回上一级  即UILogin界面  
exit(){
    this.logout();
    this.showUiLogin();
    //this.hide();
    // setTimeout(function(){
    //     this.node.destroy();
    // }.bind(this),100)
    //销毁当前节点
    this.node.destroy();
},
//获取到UiLogin,然后获取UiLogin上的脚本uiLogin,调用其中的show函数
showUiLogin:function(){
    // var uiLogin = this.node.parent.getChildByName('uiLogin');
    // uiLogin = uiLogin.getComponent('uiLogin');
    // uiLogin.show()
    //创建UILogin界面
    createUiLoginPrefab(this.node.parent);
    // cc.log(this.node.parent.getChildByName('uiLogin'));
},
show:function(){
    // this.node.active = true;
},
hide:function(){
    this.node.destroy();
    
},
//随机匹配
joinRandomRoom(){
    
    var result = engine.prototype.joinRandomRoom(GameData.mxaNumer);
    cc.log(result + 'result');
    if(result == 0 ){
        
        if(gameInfo.player1 == false){
            gameInfo.player1 = true;
            cc.log('玩家1现在改为true')
        }else if(gameInfo.player1 == true && gameInfo.player2 == false){
            gameInfo.player2 = true;
            cc.log('玩家2现在改为true');
        }
    }
    
},
//随机匹配的回调函数,回调执行的内容
joinRoomResponse(status,userInfoList,roomInfo){
    if(status == 200 ){
        gameInfo.playerNum = userInfoList.length;
        cc.log('随机匹配回调成功  status:'+status+'房间的ID:'+roomInfo.roomID+'房主ID:'+roomInfo.ownerId+'房间属性为:'+roomInfo.roomProperty);
        for(var i = 0;i < userInfoList.length;i++){
            cc.log('房间的玩家ID:'+userInfoList[i].userID);
        }if(userInfoList.length == 0){
            cc.log("房间暂时无其他玩家");
        }else if(userInfoList.length == 1){
            cc.log('可以开始匹配了');
            //当玩家为1时就可以开始游戏人了
            //这里的uiRandomRoomReady界面没有销毁   找不到   因为下面还没创建  所以找不到（我的理解）
            setTimeout(function(){
                var node = cc.find('Canvas/uiRandomRoomReady');
                cc.log(node);
                node.destroy();
                //this.node.parent.getChildByName('uiRandomRoomReady').destroy();找不到parent
            }.bind(this),100)
            createUiGamingPrefab(this.node.parent);
        }
        //销毁uiReady界面  创建uiRandomReady界面
        this.hide();
        createUiRandomRoomReadyPrefab(this.node.parent);
    }else{
        cc.log('进入房间失败');
    }
},

//注销
logout(){
    var result = engine.prototype.logout();
    cc.log(result,'logout');
}

});                    
