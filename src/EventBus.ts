import BasicBlock from "./blocks/BasicBlock";

class EventBus {
  private bus: HTMLElement;
  /**
   * Initialize a new event bus instance.
   */
  constructor() {
    this.bus = document.createElement("fakeelement");
  }

  /**
   * Add an event listener.
   */
  addEventListener(event: string, callback: EventListener) {
    this.bus.addEventListener(event, callback);
  }

  /**
   * Remove an event listener.
   */
  removeEventListener(event: string, callback: EventListener) {
    this.bus.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event.
   */
  dispatchEvent(event: string, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

export type BlockSelectedEventDetail = {
  selectedBlock: BasicBlock;
};

export const CustomEvents = {
  BLOCK_SELECTED: "blockselected",
};

export default new EventBus();
