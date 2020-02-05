
cc.Class({
    extends: cc.Component,

    properties: {
     
    },
    onLoad () {
        this.destroyTime = 0;
    },

    start () {

    },

    update (dt) {
        this.node.x -= 10;
        //三秒后自动销毁
        this.destroyTime += dt;
        if(this.destroyTime >3){
            this.node.destroy();
        }
    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.groupIndex == 4){
            this.node.destroy();
        }else if(otherCollider.node.groupIndex == 2){
            this.node.destroy();
        }
    }
});
