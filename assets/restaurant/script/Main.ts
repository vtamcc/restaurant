// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BangChuyen from "./BangChuyen";
import Food from "./Food";

export interface foodData {
    id: number,
    gold: number,
    isWin: boolean,
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    public static instance: Main = null;
    @property(cc.Label)
    lbGold: cc.Label = null;
    @property(cc.Prefab)
    prfFood: cc.Prefab = null;

    @property(cc.Node)
    listBangChuyen: cc.Node[] = [];

    @property(cc.SpriteFrame)
    listFood: cc.SpriteFrame[] = [];

    arrSpf = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    uniqueArr = []
    indexItemBangChuyen = 0;
    countCorrect = 0;
    ranDomFoods: any;
    listItemShop = [];
    speed = 50;
    gold = 0;
    // LIFE-CYCLE CALLBACKS:
    data: Array<foodData> = [
        { id: 1, gold: 50, isWin: false },
        { id: 2, gold: 55, isWin: false },
        { id: 3, gold: 125, isWin: false },
    ]

    isMove = false
    indexData = 0;

    onLoad() {
        Main.instance = this;
        this.ranDomFoods = this.getRandomFood();
        console.log(this.ranDomFoods);
        // this.renderFood();
        // this.ranDomFood();
        // this.itemFood();
        // this.movePerson();
        this.resetBangChuyen();

    }

    itemFood() {
        // for (let i = 0; i < 3; i++) {
        //     let itembangChuyen = cc.instantiate(this.prfBangchuyenItem).getComponent(BangChuyen);
        //     itembangChuyen.setSpfFood(i);
        //     this.bangChuyenList.addChild(itembangChuyen.node);
        //     this.listItemShop.push(itembangChuyen);
        // }

    }

    shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    getRandomFood() {
        this.shuffle(this.arrSpf);
        return this.arrSpf.slice(0, 3);
    }


    // checkYouWin() {
    //     if (this.count == 3) {
    //         console.log("You Win");
    //     } else {
    //         console.log("You lost")
    //     }
    // }

    start() {

    }


    resetBangChuyen() {
        this.isMove = true;
        this.indexItemBangChuyen = 0;

        // 1 doi nguoi

        // 2 doi mon an
        let arrFood = this.getRandomFood();
        this.indexData++;
        if (this.indexData > 2)
            this.indexData = 0;

        let dt = this.listBangChuyen[this.indexData].getComponent(BangChuyen)
        for (let i = 0; i < dt.itemFood.length; i++) { 
            let item = dt.itemFood[i].getComponent(Food);
            item.setId(arrFood[i]);
        }
    }
}
