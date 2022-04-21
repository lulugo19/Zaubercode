import interact from "interactjs";

export default class BlockPreview extends HTMLElement {
  name: string;
  tag: string;

  connectedCallback() {
    this.classList.add("flex0", "inline-flex", "col", "justify-between", "align-center", "p2");
    this.name = this.getAttribute("name") || "No Name";
    this.tag = this.getAttribute("tag") || "unknown-block";
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
    <img src="${img}" style="width: 100%; height: 60px; aspect-ratio: 1/1;">
      <h4>${this.name}</h4>
      `;

    const imgPreview = this.querySelector("img") as HTMLImageElement;
    let clone: HTMLImageElement;
    interact(this).draggable({
      listeners: {
        move: event => {
          const interaction = event.interaction;

          if (!clone) {
            // create a clone of the currentTarget element
            clone = imgPreview.cloneNode(true) as HTMLImageElement;
            clone.style.position = "absolute";
            clone.style.display = "block";
            clone.style.transform = "translate(-50%, -50%)";
            clone.style.zIndex = "500";
            clone.style.width = `${imgPreview.naturalWidth}px`;
            clone.style.height = `${imgPreview.naturalHeight}px`;
            // insert the clone to the page
            document.body.appendChild(clone);
            // start a drag interaction targeting the clone
            interaction.start({ name: "drag" }, event.interactable, clone);
          } else {
            clone.style.left = event.page.x + "px";
            clone.style.top = event.page.y + "px";
          }
        },

        end: e => {
          document.body.removeChild(clone);
          clone = null;
        },
      },
    });
  }
}
