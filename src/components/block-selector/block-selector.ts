import picturePreviewImg from "../../assets/graphics/palette.svg";
import soundPreviewImg from "../../assets/graphics/speaker.svg";

interface BasicBlockPreview {
  name: string;
  img: string;
  tag: string;
}

const basicElementsPreview: BasicBlockPreview[] = [
  { name: "Bild", img: picturePreviewImg, tag: "basic-block-picture" },
  { name: "Klang", img: soundPreviewImg, tag: "basic-block-sound" },
];

export default class BlockSelector extends HTMLElement {
  elements = [1, 2, 3, 4, 5, 6];

  connectedCallback() {
    this.classList.add("bg-light", "flex", "col", "justify-center", "text-center", "p3");
    const heading = this.getAttribute("heading");
    this.innerHTML = `
    <h3>${heading}</h3>
    <div class="h-full w-full flex align-start row wrap justify-evenly overflow-auto m2" style="scrollbar-gutter: stable;">${basicElementsPreview
      .map(p => `<block-preview name=${p.name} img=${p.img} tag=${p.tag}></block-preview>`)
      .join("")}</div>`;
  }
}
