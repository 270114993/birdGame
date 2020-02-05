function createUiLoginPrefab(parent){
    cc.loader.loadRes('prefab/uiLogin',function(err,prefab){
        var pre = cc.instantiate(prefab);
        parent.addChild(pre);
    }.bind(this))
};
function createUiReadyPrefab(parent){
    cc.loader.loadRes('prefab/uiReady',function(err,prefab){
        var pre = cc.instantiate(prefab);
        parent.addChild(pre);
    }.bind(this))
};
function createUiRandomRoomReadyPrefab(parent){
    cc.loader.loadRes('prefab/uiRandomRoomReady',function(err,prefab){
        var pre = cc.instantiate(prefab);
        parent.addChild(pre);
    }.bind(this))
};
function createUiGamingPrefab(parent){
    cc.loader.loadRes('prefab/uiGaming',function(err,prefab){
        var node = cc.instantiate(prefab);
        parent.addChild(node);
    }.bind(this))
};
function createYellowChickenPrefab(parent){
    cc.loader.loadRes('prefab/yellowChicken',function(err,prefab){
        var pre = cc.instantiate(prefab);
        parent.addChild(pre);
    }.bind(this))
};
function createBlueChickenPrefab(parent){
    cc.loader.loadRes('prefab/blueChicken',function(err,prefab){
        var pre = cc.instantiate(prefab);
        parent.addChild(pre);
    }.bind(this))
};
function createRightBulltePrefab(parent,pos_x,pos_y){
    cc.loader.loadRes('prefab/rightBullte',function(err,prefab){
        var pre = cc.instantiate(prefab);
        pre.x = pos_x;
        pre.y = pos_y;
        parent.addChild(pre);
        
    }.bind(this))
};
function createLeftBulltePrefab(parent,pos_x,pos_y){
    cc.loader.loadRes('prefab/leftBullte',function(err,prefab){
        var pre =cc.instantiate(prefab);
        pre.x = pos_x;
        pre.y = pos_y;
        parent.addChild(pre);
    }.bind(this))
}