// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        is_debug : false,//是否显示调试信息
        gravity: cc.v2(0,-320)//系统默认的重力加速度   //cc.p(0,-320)更新了
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        cc.director.getPhysicsManager().enabled = true;//开启物理引擎
        if(this.is_debug){//开启调试
            var Bits = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }
        else{//关闭调试
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        //重力加速度的配置
        cc.director.getPhysicsManager.gravity = this.gravity;
    },

    start () {

    },

    // update (dt) {},
});
