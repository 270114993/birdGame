
cc.Class({
    extends: cc.Component,

    properties: {
      
    },
    onLoad () {
        createUiLoginPrefab(this.node);
        // cc.loader.loadRes('prefab/uiLogin',function(err,prefab){
        //     var pre = cc.instantiate(prefab);
        //     this.node.addChild(pre);
        // }.bind(this))
        
    },

    start () {

    },

    // update (dt) {},
});
