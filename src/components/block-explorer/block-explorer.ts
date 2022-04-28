import BasicBlock from "../../blocks/BasicBlock";
import eventBus, { BlockSelectedEventDetail, CustomEvents } from "../../EventBus";

export default class BlockExplorer extends HTMLElement {
  private xPosSpan: HTMLSpanElement;
  private yPosSpan: HTMLSpanElement;
  private rotationSpan: HTMLSpanElement;
  private sizeSpan: HTMLSpanElement;

  block: BasicBlock;

  connectedCallback() {
    this.innerHTML = `
      <label for="blockname">Name:</label>
      <input type="text"/>
      </br>
      <label>Position:</label>
      (x=<span id="xPos">100</span> | y=<span id="yPos">200</span>)
      </br>
      <label>Rotation:</label>
      <span id="rotation">0</span>°
      </br>
      <label>Größe:</label>
      <span id="size">1</span>
    `;

    this.xPosSpan = this.querySelector("#xPos");
    this.yPosSpan = this.querySelector("#yPos");
    this.rotationSpan = this.querySelector("#rotation");
    this.sizeSpan = this.querySelector("#size");

    eventBus.addEventListener(CustomEvents.BLOCK_SELECTED, this.onBlockSelected.bind(this));
  }

  onBlockSelected(e: CustomEvent) {
    const showBlock = this.showBlock.bind(this);
    if (this.block) {
      this.block.removeEventListener("transformchanged", showBlock);
    }
    this.block = (e.detail as BlockSelectedEventDetail).selectedBlock;
    this.block.addEventListener("transformchanged", showBlock);
    this.showBlock();
  }

  showBlock() {
    this.xPosSpan.innerHTML = Math.round(this.block.x).toString();
    this.yPosSpan.innerHTML = Math.round(this.block.y).toString();
    this.rotationSpan.innerHTML = Math.round(this.block.rotation).toString();
    this.sizeSpan.innerHTML = this.block.size.toString();
  }
}
