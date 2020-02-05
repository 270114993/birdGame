var mvs = require('../web/Matchvs');
var msg = require('../web/MatchvsMessage');
function MatchvsResponse(){}
function MatchvsResponse_one(){}
function MatchvsResponse_two(){}
function MatchvsResponse_three(){}
function MatchvsResponse_four(){}
//使用外部传递的原型进行事件发送
MatchvsResponse.prototype.init = function(Context){
    this.context = Context;
};
//绑定多有的回调事件,只需调用一次
MatchvsResponse.prototype.bind = function(){
    mvs.response.initResponse = this.initResponse.bind(this);
    mvs.response.registerUserResponse = this.registerUserResponse.bind(this);
    mvs.response.loginResponse = this.loginResponse.bind(this);
    
    
};
//使用外部传递的原型进行事件发送    当两个相邻的预制体都引用了这个脚本，第二次执行回调会报错，传进来的this为null，
MatchvsResponse_one.prototype.init_one = function(Context){
    this.context = Context;
};
//绑定多有的回调事件,只需调用一次
MatchvsResponse_one.prototype.bind_one = function() {
    mvs.response.joinRoomResponse = this.joinRoomResponse.bind(this);
    
    
};
MatchvsResponse_two.prototype.init_two = function(Context){
    cc.log('two init:'+Context);
    this.context = Context;
};
MatchvsResponse_two.prototype.bind_two = function(){
    //其他玩家进房 回调    写错了  导致我其他玩家进入房间没有回调
    mvs.response.joinRoomNotify = this.joinRoomNotify.bind(this);
    //玩家离开房间
    mvs.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
    //其他玩家离开房间  只有通知
    mvs.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
};
MatchvsResponse_three.prototype.init_three = function(Context){
    this.context = Context;
};
MatchvsResponse_three.prototype.bind_three = function(){
    mvs.response.sendEventResponse = this.sendEventResponse.bind(this);

    mvs.response.sendEventNotify = this.sendEventNotify.bind(this);
};
MatchvsResponse_four.prototype.init_four = function(Context){
    this.context = Context;
};
MatchvsResponse_four.prototype.bind_four = function(){
    //离开房间回调
    mvs.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
}

MatchvsResponse.prototype.initResponse = function(status){
    this.context.node.emit(msg.MATCHVS_INIT,status);
};
MatchvsResponse.prototype.registerUserResponse = function(userInfo){
    this.context.node.emit(msg.MATCHVS_REGISTER_USER,userInfo);
};
MatchvsResponse.prototype.loginResponse = function(MsloginRsp){
    this.context.node.emit(msg.MATCHVS_LOGIN,MsloginRsp);
    cc.log(MsloginRsp.status);
};
//one
//当我命名为joinRandomRoomResponse时,一直回调不成功,把命名改为joinRoomResponse时,回调成功
MatchvsResponse_one.prototype.joinRoomResponse = function(status,userInfoList,roomInfo){
    this.context.node.emit(msg.MATCHVS_JOIN_ROOM_RSP,status,userInfoList,roomInfo);
};
//two
//其他玩家进入房间通知
MatchvsResponse_two.prototype.joinRoomNotify = function (roomUserInfo){
    cc.log('有玩家进入了房间');
    this.context.node.emit(msg.MATCHVS_JOIN_ROOM_NOTIFY,roomUserInfo);
};
//离开房间的回调
MatchvsResponse_two.prototype.leaveRoomResponse = function(leaveRoomRsp){
    cc.log('有玩家离开了房间');
    cc.log('two two two');
    cc.log(this.context);
    this.context.node.emit(msg.MATCHVS_LEAVE_ROOM,leaveRoomRsp);
};
//其他玩家离开房间通知
MatchvsResponse_two.prototype.leaveRoomNotify = function(leaveRoomInfo){
    cc.log('two  other player leave');
    this.context.node.emit(msg.MATCHVS_LEAVE_ROOM_NOTIFY,leaveRoomInfo);
};
//three
//发送消息回调
MatchvsResponse_three.prototype.sendEventResponse = function(sendEventRsp){
    this.context.node.emit(msg.MATCHVS_SEND_EVENT_RSP,sendEventRsp);
};
//发送消息的通知
MatchvsResponse_three.prototype.sendEventNotify = function(eventInfo){
    
    this.context.node.emit(msg.MATCHVS_SEND_EVENT_NOTIFY,eventInfo);
};
//four
MatchvsResponse_four.prototype.leaveRoomResponse = function(leaveRoomRsp){
    cc.log('four four four');
    cc.log('有玩家离开房间');
    this.context.node.emit(msg.MATCHVS_LEAVE_ROOM,leaveRoomRsp);
}
module.exports = {
    MatchvsResponse:MatchvsResponse,
    MatchvsResponse_one: MatchvsResponse_one,
    MatchvsResponse_two: MatchvsResponse_two,
    MatchvsResponse_three: MatchvsResponse_three,
    MatchvsResponse_four: MatchvsResponse_four,

};