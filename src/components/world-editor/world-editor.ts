import interact from "interactjs";
import Picture from "../../blocks/basic-block-picture";
import World from "./World";

export default class WorldEditor extends HTMLElement {
  world: World;
  scale: number = 1;

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

    const worldContainer = this.querySelector("#world") as HTMLDivElement;
    this.world = new World(worldContainer);

    interact(worldContainer).dropzone({
      accept: "block-preview",
      ondrop: e => {
        //
        console.log(e);
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let x = e.dragEvent.client.x - centerX;
        let y = centerY - e.dragEvent.client.y;

        console.log(e);
        const basicBlockPicture = document.createElement(e.relatedTarget.tag);
        basicBlockPicture.setAttribute("id", "picture");
        basicBlockPicture.setAttribute("x", x.toString());
        basicBlockPicture.setAttribute("y", y.toString());

        this.world.addBlock(basicBlockPicture);
      },
    });

    worldContainer.addEventListener("wheel", e => {
      e.preventDefault();
      this.scale += e.deltaY * -0.0025;
      this.scale = Math.max(0.01, this.scale);
      for (const block of this.world.blocks) {
        block.scale = this.scale;
      }
    });

    worldContainer.addEventListener("scroll", event => {
      worldContainer.style.backgroundPosition = `-${worldContainer.scrollLeft}px -${worldContainer.scrollTop}px`;
    });
  }
}
