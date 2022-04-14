import IObject from "./IObject";
import interact from "interactjs";
import { HotUpdateChunk } from "webpack";

export default abstract class BasicBlock extends HTMLElement implements IObject {
  id: string;
  name: string;
  tags: Set<string>;

  x: number;
  y: number;

  connectedCallback() {
    this.id = this.getAttribute("id");
    this.x = Number(this.getAttribute("x"));
    this.y = Number(this.getAttribute("y"));
    this.style.position = "absolute";
    this.style.left = "50%";
    this.style.top = "50%";
    this.configureInteraction();
    this.updatePosition();
  }

  configureInteraction() {
    interact(this).draggable({
      // enable inertial throwing
      inertia: {
        minSpeed: 300,
        endSpeed: 1000,
      },
      // keep the element within the area of it's parent
      modifiers: [],
      // enable autoScroll
      autoScroll: {
        enabled: true,
        speed: 1000,
        container: document.querySelector("#world") as HTMLElement,
      },

      listeners: {
        // call this function on every dragmove event
        move: this.onDragMove.bind(this),
      },
    });
  }

  onDragMove(event: any) {
    this.x += event.delta.x;
    this.y += event.delta.y;
    console.log(this.x, this.y);
    this.updatePosition();
  }

  updatePosition() {
    this.style.left = `calc(50% + ${this.x}px)`;
    this.style.top = `calc(50% + ${this.y}px)`;
  }
}
