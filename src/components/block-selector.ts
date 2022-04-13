export default class BlockSelector extends HTMLElement {
  elements = [1, 2, 3, 4, 5, 6];

  connectedCallback() {
    this.classList.add(
      "inline-flex",
      "align-start",
      "row",
      "wrap",
      "bg-light",
      "overflow-auto",
      "justify-evenly"
    );
    console.log(this.elements);
    this.innerHTML = this.elements
      .map(
        el =>
          `<div style="width: 100px; height: 100px;" className="flex0 inline"
          )};">${el}</div>`
      )
      .join("");
    this.updateSize(Number(this.getAttribute("size")));
  }

  updateSize(size: number) {
    const sizePx = size + "px";
    this.style.setProperty("width", sizePx);
    this.style.setProperty("height", sizePx);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === "size" && oldValue !== newValue) {
      this.updateSize(newValue);
    }
  }
}
