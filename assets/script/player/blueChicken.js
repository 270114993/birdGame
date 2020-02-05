

cc.Class({
    extends: cc.Component,

    properties: {
      blueChicken_Node:{
          type:cc.Node,
          default:null,
      }
    },



    onLoad () {
        this.blueChicken_Move = false;
        this.blueChicken_MoveSpeed =5;
        this.blueChicken_Move_L = 0;
        this.time = 0;
        //
        this.time_g = 0;
        //
        //this.spawnBulletTime = 0;
        //
        this.spawnBullte = false;
    },

    start () {

    },

    update (dt) {
        
        
        if(this.blueChicken_Move && this.blueChicken_Move_L <100){
            //if(this.time >=0.016){
                this.time += dt;
                this.blueChicken_Node.y += 20*this.time*this.time;
                this.blueChicken_Move_L += 20*this.time*this.time;
                
            //}
        }else{
            this.time = 0;
            this.blueChicken_Move =false;
            this.blueChicken_Move_L = 0;
        }
        this.time_g += dt;
        if(!this.blueChicken_Move && this.blueChicken_Node.y >-367){
            this.blueChicken_Node.y -= 10*this.time_g*this.time_g;
        }
        this.spawnBulletTime += dt;
        if(this.spawnBullte){
            createLeftBulltePrefab(this.node,this.node.getChildByName('spawnBullte').x,this.blueChicken_Node.y);
            this.spawnBullte =false;
        }
    },
});
