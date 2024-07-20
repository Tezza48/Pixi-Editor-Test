import { isScript, Script } from "../scripts";
import { Inspector } from "./Inspector";

export class EditorEntity extends Script {
    override onCreate(): void {}
    override onReady(): void {
        this.entity!.eventMode = "static";
        this.entity!.on("pointerup", () => {
            Inspector.setCurrent(this.entity!);
        });
    }
    override serialize() {}
    override deserialize(data: any): void {}
}

isScript(EditorEntity);
