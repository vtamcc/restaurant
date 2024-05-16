import Food from "./Food";
import Main from "./Main";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BangChuyen extends cc.Component {

    @property
    idBangChuyen: number = 0;

    @property(sp.Skeleton)
    char: sp.Skeleton = null

    @property(Food)
    itemFood: Food[] = []

    onLoad() {

    }

    update(dt: number) {
        if (!Main.instance.isMove)
            return

        if (this.node.x <= -720) {
            this.resetPos()
        }

        if (this.idBangChuyen == Main.instance.indexData) {
            if (this.node.x <= 0) {
                if (Main.instance.isMove)
                    Main.instance.isMove = false;
                    this.char.addAnimation(0,"idle",true);
            }
        }

        this.node.x -= 5;
    }

    resetPos() {
        this.node.x = 1440
    }
}