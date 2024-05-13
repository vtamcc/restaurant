// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BangChuyen from "./BangChuyen";
import Food from "./Food";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    public static instance: Main = null;
    @property(cc.Prefab)
    prfFood: cc.Prefab = null;

    @property(cc.Node)
    nodeItem: cc.Node = null;

    @property(cc.Node)
    bangChuyenList: cc.Node = null;

   
    @property(cc.SpriteFrame)
    listFood: cc.SpriteFrame [] = [];

    @property(cc.Prefab)
    prfBangchuyenItem: cc.Prefab = null
    arrSpf = [0,1,2,3,4,5,6,7,8,9,10,11]
    uniqueArr = []
    indexItemBangChuyen = 0;
    ranDomFoods: any;
    listItemShop = [];
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        Main.instance = this;
        this.ranDomFoods = this.getRandomFood();
        console.log(this.ranDomFoods);
        this.renderFood();
        // this.ranDomFood();
        this.itemFood();
    }

    itemFood() {
        for(let i = 0; i < 3; i++) {
            let itembangChuyen = cc.instantiate(this.prfBangchuyenItem).getComponent(BangChuyen);
            itembangChuyen.setSpfFood(i);
            this.bangChuyenList.addChild(itembangChuyen.node);
            this.listItemShop.push(itembangChuyen);
        }
        console.log(this.listItemShop);
    }

    shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    getRandomFood() {
        if (this.listFood.length < 3) {
            console.error("Not enough elements in the list to pick 3 unique items.");
            return;
        }
        this.shuffle(this.arrSpf);
        return this.arrSpf.slice(0, 3);
    }


    renderFood() {
        for(let i = 0; i < 12; i++) {
            let itemFood  = cc.instantiate(this.prfFood).getComponent(Food);
            itemFood.setId(i);
            this.nodeItem.addChild(itemFood.node);
        }
    }
    start () {

    }

    // update (dt) {}
}
