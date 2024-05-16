// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import BangChuyen from "./BangChuyen";
import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Food extends cc.Component {

    @property(cc.Sprite)
    spfFood: cc.Sprite = null;

    @property(cc.Node)
    nDung: cc.Node = null;

    @property(cc.Node)
    nSai: cc.Node = null;

    id: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    }

    setId(id: number) {
        this.id = id;
        this.spfFood.spriteFrame = Main.instance.listFood[id];
        this.nDung.active = false;
        this.nSai.active = false;
    }

    onClick() {
        Main.instance.checkCorrect(this.id);

        // console.log(this.id)
        // if(this.id == Main.instance.ranDomFoods[Main.instance.indexItemBangChuyen]) {
        //     console.log("true");
        // }else {
        //     console.log("False")
        // }

        // Main.instance.indexItemBangChuyen++;

    }

    checkYouWin() {


    }







    start() {

    }

    // update (dt) {}
}
