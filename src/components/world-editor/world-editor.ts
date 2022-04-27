import interact from "interactjs";
import Picture from "../../blocks/basic-block-picture";
import Camera from "./Camera";
import World from "./World";

export default class WorldEditor extends HTMLElement {
  world: World;
  camera: Camera;

  connectedCallback() {
    this.innerHTML = `
      <style>
        #world {
          background-image:
          repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
          repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
          background-position: 0px 0px;
          background-size: 71px 71px;
          overflow: hidden;
        }
      </style>
      <div id="world" class="position-relative h-full w-full overflow-auto">

      </div>
    `;

    const worldContainer = this.querySelector("#world") as HTMLDivElement;
    this.world = new World(worldContainer);
    this.camera = new Camera(this.world);

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

    document.addEventListener("keydown", e => {
      if (e.key === "Delete") {
        const selected = worldContainer.querySelector(".block-selected");
        if (selected) {
          selected.remove();
        }
      }
    });
  }
}
