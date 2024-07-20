import { isScript, Script } from "../scripts";

export class Centred extends Script {
    onReady(): void {
        this.updatePosition();
        window.addEventListener("resize", this.updatePosition.bind(this));
    }
    onCreate(): void {}

    private updatePosition() {
        this.entity!.position.set(
            window.__PIXI_APP__.renderer.width / 2,
            window.__PIXI_APP__.renderer.height / 2,
        );
    }
}

isScript(Centred);
