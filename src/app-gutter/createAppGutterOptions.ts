import Split from "../third-party/splitjs";
import appGutterStyle from "./app-gutter.css";

export default function createGutterOptions(
  gutterSize: number,
  handleWidth: number,
  handleHeigth: number
): Split.Options {
  const style = appGutterStyle;
  return {
    gutterSize: gutterSize,
    gutter: (index, direction) => {
      const gutterElement = document.createElement("div");
      gutterElement.className = `gutter gutter-${direction} flex justify-center align-center bg-light-gray`;
      gutterElement.style.setProperty("--gutter-size", `${gutterSize}px`);
      gutterElement.style.setProperty("--handle-width", `${handleWidth}px`);
      gutterElement.style.setProperty("--handle-height", `${handleHeigth}px`);
      gutterElement.innerHTML = `
        <style>

        </style>
        <div class="handle handle-${direction} bg-gray"></div>
      `;

      if (direction === "horizontal") {
        gutterElement.classList.add("col");
      } else if (direction === "vertical") {
        gutterElement.classList.add("row");
      }

      return gutterElement;
    },

    onDragStart: (sizes, gutter) => {
      const handle = gutter.querySelector(".handle, .gutter-drag-fill");
      [handle, gutter].forEach(el => el.classList.add("handle-drag"));
    },

    onDragEnd: (sizes, gutter) => {
      const handle = gutter.querySelector(".handle, .gutter-drag-fill");
      [handle, gutter].forEach(el => el.classList.remove("handle-drag"));
    },
  };
}
