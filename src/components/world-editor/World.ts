import BasicBlock from "../../blocks/BasicBlock";

export default class World {
  container: HTMLElement;
  blocks: BasicBlock[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  addBlock(block: BasicBlock) {
    this.blocks.push(block);
    this.container.appendChild(block);
  }

  removeBlock(block: HTMLElement) {
    this.blocks = this.blocks.filter(b => b !== block);
    block.remove();
  }
}
