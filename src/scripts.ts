import { Container } from "pixi.js";

export class Entity extends Container {
    uuid: string = crypto.randomUUID();
    scripts: Set<Script>;
    constructor() {
        super();
        this.scripts = new Set();
    }

    serialize(): any {
        return {
            position: [this.position.x, this.position.y],
            scripts: Object.fromEntries(
                Array.from(this.scripts.values()).map(
                    (s) =>
                        [
                            Object.getPrototypeOf(s).constructor.name,
                            s.serialize(),
                        ] as const,
                ),
            ),
            children: this.children
                .filter((child) => child instanceof Entity)
                .map((child) => child.serialize()),
        };
    }
}

export abstract class Script {
    uuid: string = crypto.randomUUID();
    entity?: Entity;
    abstract onCreate(): void;
    abstract onReady(): void;
    serialize(): any {
        return { uuid: this.uuid };
    }
    deserialize(data: { uuid: string }): void {
        this.uuid = data.uuid ?? this.uuid;
    }
}

export function isScript<T extends new () => Script>(value: T): T {
    scripts.set(value.name, value);
    return value;
}

export const scripts = new Map<string, new () => Script>();

export function registerScripts(...args: (new () => Script)[]) {
    for (const arg of args) {
        scripts.set(arg.name, arg);
    }
}
