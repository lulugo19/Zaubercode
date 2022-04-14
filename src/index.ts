import AppZaubercode from "./app-zaubercode";
import BlockSelector from "./components/block-selector/block-selector";
import BlockPreview from "./components/block-selector/block-preview";
import WorldEditor from "./components/world-editor/world-editor";

import Picture from "./blocks/basic-block-picture";

if (!customElements.get("app-zaubercode")) {
  customElements.define("app-zaubercode", AppZaubercode);
}

if (!customElements.get("block-selector")) {
  customElements.define("block-selector", BlockSelector);
}

if (!customElements.get("block-preview")) {
  customElements.define("block-preview", BlockPreview);
}

if (!customElements.get("world-editor")) {
  customElements.define("world-editor", WorldEditor);
}

if (!customElements.get("basic-block-picture")) {
  customElements.define("basic-block-picture", Picture);
}
