import IObject from "./IObject";
import interact from "interactjs";
import blockSelectedStyle from "./block-selected.css";

export default abstract class BasicBlock extends HTMLElement implements IObject {
  id: string;
  name: string;
  tags: Set<string>;

  x: number;
  y: number;
  rotation: number;
  size: number;

  private _scale: number;

  static blockSelectedStyle: string = blockSelectedStyle;

  get width() {
    return parseInt(this.style.width);
  }

  set width(width: number) {
    this.style.width = `${Math.round(width)}px`;
  }

  get height() {
    return parseInt(this.style.height);
  }

  set height(height: number) {
    this.style.height = `${Math.round(height)}px`;
  }

  get scale() {
    return this._scale;
  }

  set scale(s: number) {
    this._scale = s;
    this.updateTransform();
  }

  connectedCallback() {
    this.id = this.getAttribute("id");
    this.x = Number(this.getAttribute("x"));
    this.y = Number(this.getAttribute("y"));
    this.rotation = Number(this.getAttribute("rotation")) || 0;
    this.size = 1;
    this.scale = 1;
    this.style.position = "absolute";
    this.style.left = "50%";
    this.style.top = "50%";
    this.classList.add("block");
    this.configureInteraction();
    this.updateTransform();
    this.createRotationHandle();
    this.createScaleHandle();
  }

  configureInteraction() {
    const select = this.select.bind(this);
    this.addEventListener("mousedown", select);

    interact(this).draggable({
      // keep the element within the area of it's parent
      modifiers: [],

      listeners: {
        start: e => {
          this.classList.add("block-moving");
        },
        move: e => {
          this.x += e.delta.x;
          this.y -= e.delta.y;
          this.updateTransform();
        },
        end: e => {
          this.classList.remove("block-moving");
        },
      },

      cursorChecker: () => {
        if (this.classList.contains("block-moving")) {
          return `cursor: url("./rotate-cursor.png") 12 12, auto`;
        }
      },
    });
  }

  createRotationHandle() {
    const rotationHandle = document.createElement("div");
    rotationHandle.classList.add("block-rotation-handle");
    const rotationKnob = document.createElement("div");
    rotationKnob.classList.add("block-rotation-knob");
    rotationHandle.appendChild(rotationKnob);

    this.appendChild(rotationHandle);

    let centerX = 0,
      centerY = 0,
      rot = this.rotation;
    interact(rotationKnob)
      .draggable({
        listeners: {
          start: e => {
            const rect = this.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
          },
          move: e => {
            const angle =
              (Math.atan2(centerY - e.clientY, centerX - e.clientX) * 180) / Math.PI - 90;
            this.rotation = rot + angle;
            this.updateTransform();
          },
        },
      })
      .styleCursor(false);
  }

  createScaleHandle() {
    const scaleHandle = document.createElement("div");
    scaleHandle.classList.add("block-scale-knob");

    this.appendChild(scaleHandle);
    let centerX = 0,
      centerY = 0,
      w = 0,
      h = 0,
      sx = 0,
      sy = 0;
    interact(scaleHandle).draggable({
      listeners: {
        start: e => {
          const rect = this.getBoundingClientRect();
          w = parseInt(this.style.width);
          h = parseInt(this.style.height);
          const theta = (this.rotation * Math.PI) / 180;
          sx = w * Math.cos(theta) - h * Math.sin(theta);
          sy = w * Math.sin(theta) + h * Math.cos(theta);
          centerX = rect.left + rect.width / 2;
          centerY = rect.top + rect.height / 2;
        },

        move: e => {
          // project the position on the diagonal vector in order to calculate the size
          const ux = e.page.x - centerX;
          const uy = e.page.y - centerY;
          const f = (sx * ux + sy * uy) / (sx * sx + sy * sy);
          const usx = f * sx;
          const usy = f * sy;
          const half = Math.sqrt((w / 2) * (w / 2) + (h / 2) * (h / 2));
          const distance = Math.sqrt(usx * usx + usy * usy);
          this.size = distance / half;
          this.width = w * this.size;
          this.height = h * this.size;
        },
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

  updateTransform() {
    this.style.left = `calc(50% + ${Math.round(this.x * this._scale)}px)`;
    this.style.top = `calc(50% - ${Math.round(this.y * this._scale)}px)`;
    this.style.transform = `translate(-50%, -50%) rotate(${this.rotation}deg) scale(${this._scale})`;
  }
}
