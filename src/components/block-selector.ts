export default class BlockSelector extends HTMLElement {
  elements = [1, 2, 3, 4, 5, 6];

  connectedCallback() {
    console.log(this.elements);
    this.innerHTML = `<div class="h-full w-full flex align-start row wrap bg-light justify-evenly overflow-auto m2">${this.elements
      .map(
        el =>
          `<div style="width: 100px; height: 100px;" className="flex0 inline"
          )};">${el}</div>`
      )
      .join("")}</div>`;
  }
}
