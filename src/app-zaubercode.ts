import Split from "./third-party/splitjs";
import createAppGutterOptions from "./app-gutter/createAppGutterOptions";
import Icon from "./assets/icon.png";
import BlockSelector from "./components/block-selector/block-selector";

export default class AppZaubercode extends HTMLElement {
  columns: Split.Instance;
  column1: Split.Instance;
  column2: Split.Instance;
  column3: Split.Instance;

  basicElementsSelector: BlockSelector;
  customBlocksSelector: BlockSelector;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="flex col h-full w-full overflow-hidden bg-light">
    <nav class="flex flex-0 row w-full text-light p1 bg-primary" style="height: 40px">
      <img src="${Icon}" style="width: 30px; height: 30px; margin-right: 10px;" title="Wizard Icon created by Freepik"></img>
      <h2>Zaubercode</h2>
      <!--<a href="https://www.flaticon.com/free-icons/wizard" title="wizard icons">Wizard icons created by Freepik - Flaticon</a>-->
    </nav>
    <div class="flex row w-full" style="height: calc(100% - 40px)">
      <div id="mainCol1" class="flex col h-full">
        <block-selector id="basicElementsSelector" heading="Basis Blöcke"></block-selector>
        <block-selector id="customBlocksSelector" heading="Eigene Blöcke"></block-selector>
      </div>
      <div id="mainCol2" class="flex col h-full">
        <world-editor id="worldEditor"></world-editor>
        <block-explorer id="blockExplorer"></block-explorer>
      </div>
      <div id="mainCol3" class="flex col h-full">
        <div id="actionCodeEditor"></div>
        <div id="eventCodeEditor"></div>
      </div>
    </div>
    </div>`;

    this.basicElementsSelector = this.querySelector("#basicElementsSelector");
    this.customBlocksSelector = this.querySelector("#customBlocksSelector");

    this.columns = Split(["#mainCol1", "#mainCol2", "#mainCol3"], {
      minSize: [100, 500, 300],
      maxSize: [400, Infinity, Infinity],
      direction: "horizontal",
      ...createAppGutterOptions("main-split", [12.5, 50, 37.5]),
    });

    this.column1 = Split(["#basicElementsSelector", "#customBlocksSelector"], {
      sizes: [50, 50],
      minSize: [200, 200],
      direction: "vertical",
      ...createAppGutterOptions("block-selector", [50, 50]),
    });

    this.column2 = Split(["#worldEditor", "#blockExplorer"], {
      sizes: [50, 50],
      minSize: [200, 200],
      direction: "vertical",
      ...createAppGutterOptions("world-editor", [50, 50]),
    });

    this.column3 = Split(["#actionCodeEditor", "#eventCodeEditor"], {
      sizes: [50, 50],
      minSize: [200, 200],
      direction: "vertical",
      ...createAppGutterOptions("code-editors", [50, 50]),
    });
  }
}
