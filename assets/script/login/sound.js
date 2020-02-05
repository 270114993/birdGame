
cc.Class({
    extends: cc.Component,

    properties: {
        sound:{
            type:cc.AudioClip,
            default:[],
        }
    },
    onLoad () {},

    start () {

    },
    playReadygoSound(){
        cc.audioEngine.play(this.sound[0],false,1);
    },
    playBulletShootSound(){
        cc.audioEngine.play(this.sound[1],false,1);
    },
    playJumpSound(){
        cc.audioEngine.play(this.sound[2],false,1);
    },
    

    // update (dt) {},
});
