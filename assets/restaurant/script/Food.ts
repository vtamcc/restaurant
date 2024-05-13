// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BangChuyen from "./BangChuyen";
import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Food extends cc.Component {

    public static instance: Food = null;
    @property(cc.Sprite)
    bgFood: cc.Sprite = null;

    // @property(cc.SpriteFrame)
    // listFood: cc.SpriteFrame [] = [];

    id: number = 0;
   
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    setId(id:number) {
        this.id = id;
        this.bgFood.spriteFrame = Main.instance.listFood[id];
        // console.log(id)
    }

    onClick(){
       
       if(this.id == Main.instance.ranDomFoods[Main.instance.indexItemBangChuyen]) {  
            // Main.instance.nodeSpfCheckTrue.active = true;
            // Main.instance.bangChuyenItem[i]
            Main.instance.listItemShop[Main.instance.indexItemBangChuyen].nodeActiveTrue.active = true;
            console.log("Dung")
        }
       else {
        Main.instance.listItemShop[Main.instance.indexItemBangChuyen].nodeActiveFalse.active = true;
            console.log("Sai");
       }
       Main.instance.indexItemBangChuyen++;
       console.log("Click item ", this.id);
       console.log("Phan tu thu ",Main.instance.indexItemBangChuyen);
        
    }


    


   

    start () {

    }

    // update (dt) {}
}
