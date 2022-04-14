import palette from "../assets/graphics/palette.svg";
import BasicBlock from "./BasicBlock";

export default class Picture extends BasicBlock {
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = `<img src=${palette} style="width: 100px; height: auto;"/>`;
  }
}
