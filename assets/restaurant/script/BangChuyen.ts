// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BangChuyen extends cc.Component {

    public static instance : BangChuyen = null
    @property(cc.Node)
    nodeActiveTrue: cc.Node = null;

    @property(cc.Sprite)
    spfFood: cc.Sprite = null;
    @property(cc.Node)
    nodeActiveFalse: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        BangChuyen.instance = this;
    }

    start () {

    }
    setSpfFood(id) {
        this.spfFood.spriteFrame = Main.instance.listFood[Main.instance.ranDomFoods[id]];
    }
    // update (dt) {}
}
