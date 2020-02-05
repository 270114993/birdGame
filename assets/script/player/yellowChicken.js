
cc.Class({
    extends: cc.Component,

    properties: {
        yellowChicken_Node:{
            type:cc.Node,
            default:null,
        },
    },



    onLoad () {
        //关于小鸡运动的一些属性
        this.yellowChicken_Move = 0;
        this.yellowChicken_Move_L = 0;
        this.time = 0;
        //
        this.time_g = 0;
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStartCallback,this,true);
        //子弹发射间隔
        this.spawnBullteTime = 0;
        //是否发射子弹
        this.spawnBullte = 0;
        
    },

    start () {
        
    },
    onTouchStartCallback:function(){
    },

    update (dt) {
        //小鸡的运动
        if(this.yellowChicken_Move == 1 && this.yellowChicken_Move_L < 100){
            // this.node.getChildByName('yellowChicken').getComponent(cc.Animation).play('yellowChickenMoveAnim');
            this.time += dt;
            this.yellowChicken_Node.y += 20*this.time*this.time;
            this.yellowChicken_Move_L += 20*this.time*this.time;  
            cc.log(this.time);          
        }
        else if(this.yellowChicken_Move_L >=100){
            // this.node.getChildByName('yellowChicken').getComponent(cc.Animation).stop('yellowChickenMoveAnim');
            this.yellowChicken_Move = 0;
            this.yellowChicken_Move_L = 0;
            this.time = 0;
        }
        this.time_g += dt;
        if(this.yellowChicken_Move == 0 && this.yellowChicken_Node.y >-367){
            this.yellowChicken_Node.y -= 10*this.time_g*this.time_g;
        }
        //子弹的发射
        this.spawnBullteTime += dt;
        if(this.spawnBullteTime >1){
            //var bullteWorldSpace = this.node.parent.convertToWorldSpaceAR(this.node.getChildByName('spawnBullte'));//坐标系的转换
            this.spawnBullte = 2;
            if(this.spawnBullte == 2){
                createRightBulltePrefab(this.node,this.node.getChildByName('spawnBullte').x,this.yellowChicken_Node.y);
                this.node.parent.getComponent('sound').playBulletShootSound();
                this.node.parent.getChildByName('uiGaming').getComponent('uiGaming').sendEvent(this.spawnBullte);
                this.spawnBullte = 0;
            }
            this.spawnBullteTime -= this.spawnBullteTime;
        }
    },
    onBeginContact:function(contact,selfCollider,otherCollider){
        if(otherCollider.node.groupIndex == 5){
            //进行死亡播放   并传递消息给对方

            //开始第二回合
        }
    }
});
