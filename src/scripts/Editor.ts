import { rootEntity, Tweakpane } from "../global";
import { isScript, Script } from "../scripts";

export class Editor extends Script {
    override onCreate(): void {
        const pane = Tweakpane.addFolder({ title: "Menu" });
        pane.addButton({ title: "Save" }).on("click", () => {
            const data = JSON.stringify(
                rootEntity.serialize().children,
                undefined,
                2,
            );
            console.log(data);
        });
    }
    override onReady(): void {}
}

isScript(Editor);
