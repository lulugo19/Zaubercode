import BasicBlock from "../../blocks/BasicBlock";
import Camera from "./Camera";

export default class World {
  container: HTMLElement;
  camera: Camera;
  blocks: BasicBlock[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  addBlock(block: BasicBlock) {
    this.blocks.push(block);
    block.world = this;
    this.container.appendChild(block);
  }

  removeBlock(block: HTMLElement) {
    this.blocks = this.blocks.filter(b => b !== block);
    block.remove();
  }
}
