export default class BlockPreview extends HTMLElement {
  name: string;

  connectedCallback() {
    this.classList.add("flex0", "inline-flex", "col", "justify-between", "align-center", "p2");
    this.name = this.getAttribute("name") || "No Name";
    const img = this.getAttribute("img");
    this.innerHTML = `
    <style>
      block-preview {
        min-width: min(100%, 100px);
        border: 3px solid var(--primary);
        border-radius: 10px;
        text-align: center;
        margin-top: 1em;
      }
    </style>
    <img src="${img}" style="width: 100%; max-height: 60px; aspect-ratio: 1/1;">
      <h4>${this.name}</h4>
      `;
  }
}
