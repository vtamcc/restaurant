import Food from "./Food";
import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BangChuyen_0 extends cc.Component {


    onLoad() {

    }

    update(dt: number) {
        if (!Main.instance.isMove)
            return

        if (this.node.x <= -720) {
            this.node.destroy();
        }
        this.node.x -= 5;
    }

   
}