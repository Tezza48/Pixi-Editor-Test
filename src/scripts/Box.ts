import { Graphics } from "pixi.js";
import { Script, isScript } from "../scripts";

export class Box extends Script {
    w?: number;
    h?: number;

    onCreate(): void {}
    onReady(): void {
        const gfx = new Graphics();
        gfx.rect(0, 0, this.w!, this.h!);
        gfx.fill({ color: "hotpink" });
        this.entity!.addChild(gfx);
    }

    override deserialize(data: any) {
        super.deserialize(data);

        this.w = data.w;
        this.h = data.h;
    }

    override serialize() {
        return { ...super.serialize(), w: this.w, h: this.h };
    }
}

isScript(Box);
