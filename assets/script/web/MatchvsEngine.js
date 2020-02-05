var mvs = require('../web/Matchvs');
var gameData = require('../web/ExamplesData');

function NetworkEngine(){}
//
NetworkEngine.prototype.init = function(channel,platform,gameId,appKey){
    var result = mvs.engine.init(mvs.response,channel,platform,gameId,appKey,1);
    console.log('初始化result:'+result);
    return result;
};
NetworkEngine.prototype.registerUser = function(){
    var result = mvs.engine.registerUser();
    cc.log('注册result:'+result);
    return result;
};
//
NetworkEngine.prototype.login = function(userID,token){
    var DeviceID = 'matchvs';
    var result = mvs.engine.login(userID,token,DeviceID);
    cc.log('登录result'+result);
    return result;
};
//随机进房  错误的
// NetworkEngine.prototype.randomRoom = function(mxaNumer){
//     // var result = mvs.engine.randomRoom(mxaNumer);//改了joinRandomRoom,所以报错了
//     var result = mvs.engine.randomRoom(mxaNumer,gameData.userName+'进入了房间');
//     return result;
// }
//随机进房
NetworkEngine.prototype.joinRandomRoom = function(mxaNumer){
    var result = mvs.engine.joinRandomRoom(mxaNumer,gameData.userName+'进入了ll房间');//这一行的joinRandomRoom不能改,因为这是Matchvs自己写的,我们不能改
    console.log('随机匹配result'+result);
    return result;
};
//注销
NetworkEngine.prototype.logout = function(){
    var result = mvs.engine.logout('注销');
    return result;
},
//关闭房间
NetworkEngine.prototype.joinOver = function(){
    var result = mvs.engine.joinOver('关闭房间');
    cc.log('result:'+result);
    return result;
},
//离开房间
NetworkEngine.prototype.leaveRoom = function(){
    var result = mvs.engine.leaveRoom('离开房间');
    cc.log(result);
    return result;
},
NetworkEngine.prototype.sendEvent = function(msg){
    var data = mvs.engine.sendEvent(msg);
    return data.result;
}
module.exports = NetworkEngine;