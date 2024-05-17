// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Win extends cc.Component {

   @property(cc.Node)
   nodeLight: cc.Node = null;
   private rotateAction: cc.Action = null;

   speed: 100;

   rotateItem() {
        let duration = 360 / this.speed;
        this.rotateAction = cc.repeatForever(cc.rotateBy(duration, 360));
        this.nodeLight.runAction(this.rotateAction);
        console.log("Xoay")
    }
   start () {

    }

    
}
