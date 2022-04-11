import Split from "./third-party/splitjs";
import createAppGutterOptions from "./app-gutter/createAppGutterOptions";
import Icon from "./assets/icon.png";

export default class AppZaubercode extends HTMLElement {
  columns: Split.Instance;
  column1: Split.Instance;
  column2: Split.Instance;
  column3: Split.Instance;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="container flex col h-full w-full">
    <nav class="flex w-full text-light p1 bg-primary">
      <img src="${Icon}" style="width: 30px; height: 30px; margin-right: 10px;" title="Wizard Icon created by Freepik"></img>
      <h2>Zaubercode</h2>
      <!--<a href="https://www.flaticon.com/free-icons/wizard" title="wizard icons">Wizard icons created by Freepik - Flaticon</a>-->
    </nav>
    <div class="flex grow">
      <div id="mainCol1" class="flex col h-full">
        <div id="primaryBlocksSelector"></div>
        <div id="customBlocksSelector"></div>
      </div>
      <div id="mainCol2" class="flex col h-full">
        <div id="worldEditor"></div>
        <div id="blockExplorer"></div>
      </div>
      <div id="mainCol3" class="flex col f-full">
        <div id="primaryBlocksExplorer"></div>
        <div id="customBlocksExplorer"></div>
      </div>
    </div>
    </div>`;

    this.columns = Split(["#mainCol1", "#mainCol2", "#mainCol3"], {
      sizes: [12.5, 50, 37.5],
      minSize: [100, 500, 300],
      maxSize: [400, Infinity, Infinity],
      direction: "horizontal",
      ...createAppGutterOptions(2, 30, 5),
    });

    this.column1 = Split(["#primaryBlocksSelector", "#customBlocksSelector"], {
      sizes: [50, 50],
      minSize: [200, 200],
      direction: "vertical",
      ...createAppGutterOptions(2, 30, 5),
    });

    this.column2 = Split(["#worldEditor", "#blockExplorer"], {
      sizes: [50, 50],
      minSize: [200, 200],
      direction: "vertical",
      ...createAppGutterOptions(2, 30, 5),
    });

    this.column3 = Split(["#primaryBlocksExplorer", "#customBlocksExplorer"], {
      sizes: [50, 50],
      minSize: [200, 200],
      direction: "vertical",
      ...createAppGutterOptions(2, 30, 5),
    });
  }
}

if (!customElements.get("app-zaubercode")) {
  customElements.define("app-zaubercode", AppZaubercode);
}
