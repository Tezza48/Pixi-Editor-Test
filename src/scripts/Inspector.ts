import type { FolderApi } from "tweakpane";
import { Tweakpane } from "../global";
import { Entity, isScript, Script } from "../scripts";

export class Inspector extends Script {
    public static current: Entity | null = null;
    public static setCurrent(entity: Entity) {
        this.current = entity;
        if (this.folder) {
            this.folder.dispose();
        }

        this.folder = Tweakpane.addFolder({ title: "Inspector" });
        this.folder.addBinding(this.current, "position");
    }

    private static folder?: FolderApi = undefined;

    private static instance: Inspector;
    constructor() {
        super();

        if (!Inspector.instance) Inspector.instance = this;
        else throw new Error("Unreachable");
    }

    override onCreate(): void {}
    override onReady(): void {}
    override serialize() {}
    override deserialize(data: any): void {}
}
isScript(Inspector);
