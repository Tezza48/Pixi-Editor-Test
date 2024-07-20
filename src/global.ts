import { Application } from "pixi.js";
import { Pane } from "tweakpane";
import { Entity } from "./scripts";

export const Tweakpane = new Pane({ title: "Editor" });

export const app = new Application();

export const rootEntity = new Entity();
app.stage.addChild(rootEntity);
