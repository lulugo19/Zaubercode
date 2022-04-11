export default class BlockExplorer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="bg-primary grow w-full"></div>`;
  }
}

if (!customElements.get("app-block-explorer")) {
  customElements.define("app-block-explorer", BlockExplorer);
}
