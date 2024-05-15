// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


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
        // console.log(id)
    }


    onClick() {
        if (this.id === Main.instance.ranDomFoods[Main.instance.indexItemBangChuyen]) {
            Main.instance.countCorrect++;
            Main.instance.gold += 50;

            Main.instance.listItemShop[Main.instance.indexItemBangChuyen].nodeActiveTrue.active = true;
            Main.instance.lbGold.string = Main.instance.gold + " ";
            console.log("Dung")
        }
        else {
            Main.instance.listItemShop[Main.instance.indexItemBangChuyen].nodeActiveFalse.active = true;
            console.log("Sai");
        }

        Main.instance.indexItemBangChuyen++;
        Main.instance.checkYouWin();
        console.log("Click item ", this.id);
        console.log("Phan tu thu ", Main.instance.indexItemBangChuyen);

        if (Main.instance.indexItemBangChuyen == 3) {
            if (Main.instance.countCorrect < 3) {
                console.log("thua cmnr");
            }
            else
            {
                Main.instance.resetBangChuyen()
                console.log("di tiep");
            }
        }
    }

    checkYouWin() {


    }







    start() {

    }

    // update (dt) {}
}
