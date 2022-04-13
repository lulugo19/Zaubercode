import Split from "../third-party/splitjs";
import appGutterStyle from "./app-gutter.css";

export default function createGutterOptions(
  id: string,
  defaultSizes: number[],
  gutterSize: number = 2,
  handleWidth: number = 30,
  handleHeigth: number = 5
): Split.Options {
  const localStorageId = `split-sizes-${id}`;
  const style = appGutterStyle;
  let splitSizes: string | number[] = localStorage.getItem(localStorageId);
  if (splitSizes) {
    splitSizes = JSON.parse(splitSizes);
  } else {
    splitSizes = defaultSizes;
  }
  return {
    sizes: splitSizes as number[],
    gutterSize: gutterSize,
    gutter: (index, direction) => {
      const gutterElement = document.createElement("div");
      gutterElement.className = `gutter gutter-${direction} flex justify-center align-center bg-light-gray`;
      gutterElement.style.setProperty("--gutter-size", `${gutterSize}px`);
      gutterElement.style.setProperty("--handle-width", `${handleWidth}px`);
      gutterElement.style.setProperty("--handle-height", `${handleHeigth}px`);
      gutterElement.innerHTML = `
        <div class="handle handle-${direction} bg-gray"></div>
        <div class="gutter-fill"></div>
      `;

      if (direction === "horizontal") {
        gutterElement.classList.add("col");
      } else if (direction === "vertical") {
        gutterElement.classList.add("row");
      }

      return gutterElement;
    },

    onDragStart: (sizes, gutter) => {
      const elements = gutter.querySelectorAll(".handle, .gutter-fill");
      elements.forEach(el => el.classList.add("handle-drag"));
    },

    onDragEnd: (sizes, gutter) => {
      localStorage.setItem(localStorageId, JSON.stringify(sizes));
      const elements = gutter.querySelectorAll(".handle, .gutter-fill");
      elements.forEach(el => el.classList.remove("handle-drag"));
    },
  };
}
