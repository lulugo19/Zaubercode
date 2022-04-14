import IObject from "./IObject";
import interact from "interactjs";
import blockSelectedStyle from "./block-selected.css";

export default abstract class BasicBlock extends HTMLElement implements IObject {
  id: string;
  name: string;
  tags: Set<string>;

  x: number;
  y: number;

  static blockSelectedStyle: string = blockSelectedStyle;

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
    const select = this.select.bind(this);
    this.addEventListener("mousedown", select);

    interact(this).draggable({
      // keep the element within the area of it's parent
      modifiers: [],

      listeners: {
        // call this function on every dragmove event
        move: this.onDragMove.bind(this),
      },
    });
  }

  select(event: any) {
    const currentSelected = this.parentElement.querySelector(".block-selected") as HTMLElement;
    if (currentSelected) {
      currentSelected.classList.remove("block-selected");
    }
    this.classList.add("block-selected");
  }

  onDragMove(event: any) {
    this.x += event.delta.x;
    this.y += event.delta.y;
    this.updatePosition();
  }

  updatePosition() {
    this.style.left = `calc(50% + ${this.x}px)`;
    this.style.top = `calc(50% + ${this.y}px)`;
  }
}
