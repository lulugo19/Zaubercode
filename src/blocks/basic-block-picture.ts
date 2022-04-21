import palette from "../assets/graphics/palette.svg";
import BasicBlock from "./BasicBlock";

export default class Picture extends BasicBlock {
  connectedCallback() {
    this.innerHTML = `<img src=${palette} style="width: 100%; height: 100%;"/>`;
    const img = this.querySelector("img");
    img.addEventListener(
      "load",
      () => {
        this.style.width = `${img.naturalWidth}px`;
        this.style.height = `${img.naturalHeight}px`;
        super.connectedCallback();
      },
      { once: true }
    );
  }
}
