// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BangChuyen from "./BangChuyen";
import Food from "./Food";
import Win from "./Win";

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

    @property(cc.Node)
    nodeListItem: cc.Node = null;
    @property(cc.Label)
    lbNumberPlayer: cc.Label = null;

    @property(cc.ProgressBar)
    prgBar: cc.ProgressBar = null;

    @property(cc.Label)
    lbCountdown: cc.Label = null;

    @property(cc.Prefab)
    prfWin: cc.Prefab = null;

    @property(cc.Prefab)
    prfLost: cc.Prefab = null;
    @property(cc.Node)
    nodeHand: cc.Node = null;
    numberCountdown = 20;
    countdownInterval: any = null;
    quantityPlayer = 3;
    arrSpf = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    uniqueArr = []
    indexItemBangChuyen = 0;
    countCorrect = 0;
    ranDomFoods: any;
    listItemFood = [];
    arrFood;
    speed = 50;
    gold = 0;
    scaleDuration = 0.4;
    minScale = 0.5;
    maxScale = 0.7;
    private resizeAction: cc.Action = null;

    
    // LIFE-CYCLE CALLBACKS:
    
    
    isMove = false
    indexData = -1;
    isOpen = false
    isWin = false;
    onLoad() {
        Main.instance = this;
        this.resetBangChuyen();
        this.renderFood();
        // this.ranDomFood();
        // this.itemFood();
        // this.movePerson();
        console.log(this.arrFood);
        // this.checkReset();
        this.setPosHand();
        this.startCountDown();
        this.scaleHand();
    }


    scaleHand() {
       let scaleUp = cc.scaleTo(this.scaleDuration,this.minScale);
       let scaleDown = cc.scaleTo(this.scaleDuration,this.maxScale);
       this.resizeAction = cc.repeatForever(cc.sequence(scaleUp, scaleDown));
       this.nodeHand.runAction(this.resizeAction);
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

    renderFood() {
        for (let i = 0; i < 12; i++) {
            let itemFood = this.nodeListItem.children[i]
            itemFood.getComponent(Food).setId(i);
        }
    }
   effectWin() {
        let pfrYouWin = cc.instantiate(this.prfWin).getComponent(Win)
        //pfrYouWin.rotateItem();
        this.node.addChild(pfrYouWin.node);

   }

   setPosHand() {
        let indexFood = this.arrFood[0];
        console.log("id ", indexFood);
        for(let i = 0; i < 12; i++) {
            if(indexFood == this.arrSpf[i]) {
                console.log(true);
                console.log(this.arrSpf[i]);
                let pos = this.nodeListItem.children[this.arrSpf[i]].position;
                this.nodeHand.setPosition(pos);
                return;
            }
        }
   }
   effectLost() {
        let pfrYouLost = cc.instantiate(this.prfLost)
        //pfrYouWin.rotateItem();
        this.node.addChild(pfrYouLost);

    }

    actionChar() {
        let dt = this.listBangChuyen[this.indexData].getComponent(BangChuyen)
        if (this.countCorrect < 2)
            dt.char.setAnimation(0, "discomfort", true);
        else {
            dt.char.setAnimation(0, "happy", true);
            this.scheduleOnce( () => {
                dt.char.setAnimation(0,"happy_out",true);
            },1)
           
        }
            
    }

    startCountDown() {
        this.updateCountDown();
        this.countdownInterval = setInterval(() => {
            this.numberCountdown--;
            this.updateCountDown();
            if(this.numberCountdown <= 0 ) {
                this.effectLost();
                this.stopCountDown();
                this.onCountDownEndGame();
            }
        },1000)
    }

    stopCountDown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    onCountDownEndGame() {
        console.log("You Lost")
    }
    updateCountDown() {
        this.lbCountdown.string = this.numberCountdown + " ";
    }

    checkCorrect(idFood) {
        // if (idFood === this.arrFood[this.indexItemBangChuyen]) {
        //     console.log(this.arrFood[this.indexItemBangChuyen]);
        //     this.countCorrectIsTrue++;
        //     this.gold += 50;
        //     this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[this.indexItemBangChuyen].nDung.active = true;
        //     Main.instance.lbGold.string = Main.instance.gold + " ";
        //     console.log("Dung")
        // }
        // else {
        //     this.countCorrectIsFalse++;
        //     console.log("Count sai ", this.countCorrectIsFalse);
        //     this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[this.indexItemBangChuyen].nSai.active = true;
        //     console.log("Sai");
        // }

        
        // console.log("index=== ", Main.instance.indexItemBangChuyen);
        // if (this.indexItemBangChuyen == 3) {
        //     this.actionChar()
        //     if (this.countCorrectIsFalse >= 2) {
        //         console.log("thua cmnr"); // show popup
        //     }
        //     else if(this.countCorrectIsTrue >= 3) {
        //         this.prgBar.progress += 0.35;
        //         this.quantityPlayer--;
        //         this.lbGold.string = 0 + " ";
        //         this.gold += 0;
        //         console.log("di tiep");
        //         this.scheduleOnce(() => {
        //             this.resetBangChuyen()
        //         },0.7)
                
        //     }
        // }
        
        
        // if (this.quantityPlayer <= 0) {
        //     console.log("You win");
        //     return;
        // }
        this.nodeHand.destroy();

        console.log("id = ", idFood);
        let test = this.arrFood.indexOf(idFood);
        console.log("test ", test);
        if(test > -1) {
            this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[test].nDung.active = true;
            this.gold += 50;
            
            this.countCorrect++;
        }else {
            this.scheduleOnce(() => {
                this.effectLost();
            },1)
            this.actionChar();
            console.log("Thua")
            this.stopCountDown();
            for(let i = 0; i < this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood.length; i++) {
                if(this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[i].nDung.active == true) return
                else {
                    this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[i].nSai.active = true;
                }
               
            }
        }
        this.lbGold.string = this.gold + " ";
        
        if(this.countCorrect == 3) {
            this.actionChar()
            this.prgBar.progress += 0.35;
            this.quantityPlayer--;
            this.lbGold.string = 0 + " ";
            this.gold += 0;
            console.log("di tiep");
            this.scheduleOnce(() => {
                this.resetBangChuyen()
            },0.7)
        }

        if(this.quantityPlayer <= 0) {
            this.actionChar();
            this.scheduleOnce(() => {
                this.effectWin();
            },1)
            this.stopCountDown();
        }
        
        this.lbNumberPlayer.string = Main.instance.quantityPlayer + '';

        
        // if(this.arrFood.includes(idFood)) {
        //     // this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[idFood].nDung.active = true;
        // }else {
        //     // this.listBangChuyen[this.indexData].getComponent(BangChuyen).itemFood[idFood].nSai.active = true;
        // }
       
    }

    resetBangChuyen() {
        this.isMove = true;
        this.indexItemBangChuyen = 0;
        this.indexData++;
        // for(let i = 0; i < arrChar.length; i++) {
        //     let itemChar = dtChar.char[i]
        //     console.log(itemChar);
        // }
        // 1 doi nguoi
    
        // 2 doi mon an
        this.gold = 0;
        this.countCorrect = 0;
        console.log("index data ", this.indexData);
        this.arrFood = this.getRandomFood();
        if (this.indexData >2)
            this.indexData = 0;
        let dt = this.listBangChuyen[this.indexData].getComponent(BangChuyen)
        for (let i = 0; i < dt.itemFood.length; i++) {
            let item = dt.itemFood[i].getComponent(Food);
            item.setId(this.arrFood[i]);
        }
    }
}
