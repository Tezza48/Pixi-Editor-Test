await Promise.all(
    Object.values(import.meta.glob("./scripts/*.ts")).map((v) => v()),
);

import SceneDescriptor from "./SceneDescriptor.json";
import { Entity, scripts } from "./scripts";
import "./global";
import { app, rootEntity } from "./global";

window.__PIXI_APP__ = app;

await app.init({
    resizeTo: window,
});

app.canvas.style.margin = "0";
app.canvas.style.padding = "0";

document.body.appendChild(app.canvas);

const scene: EntityData[] = SceneDescriptor as unknown as EntityData[];

type EntityData = { position: [number, number]; scripts: Record<string, any> };

function load(data: EntityData) {
    const e = new Entity();
    e.position.set(data.position[0], data.position[1]);
    for (const [name, d] of Object.entries(data.scripts)) {
        const ctor = scripts.get(name)!;
        const script = new ctor();
        script.onCreate();
        script.entity = e;
        script.deserialize(d);
        e.scripts.add(script);
    }

    for (const script of e.scripts) {
        script.onReady();
    }

    return e;
}

for (const entityData of scene) {
    const e = load(entityData);
    rootEntity.addChild(e);
}
