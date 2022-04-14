import Picture from "../../blocks/basic-block-picture";

export default class WorldEditor extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        #world {
          background-image:
          repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
          repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
          background-position: 0px 0px;
          background-size: 71px 71px;
        }
      </style>
      <div id="world" class="position-relative h-full w-full overflow-auto">

      </div>
    `;

    const world = this.querySelector("#world") as HTMLDivElement;
    const basicBlockPicture = document.createElement("basic-block-picture");
    basicBlockPicture.setAttribute("id", "picture");
    basicBlockPicture.setAttribute("x", "0");
    basicBlockPicture.setAttribute("y", "0");
    world.appendChild(basicBlockPicture);

    world.addEventListener("scroll", event => {
      world.style.backgroundPosition = `-${world.scrollLeft}px -${world.scrollTop}px`;
    });
  }
}
