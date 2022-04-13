import AppZaubercode from "./app-zaubercode";
import BlockSelector from "./components/block-selector/block-selector";
import BlockPreview from "./components/block-selector/block-preview";

if (!customElements.get("app-zaubercode")) {
  customElements.define("app-zaubercode", AppZaubercode);
}

if (!customElements.get("block-selector")) {
  customElements.define("block-selector", BlockSelector);
}

if (!customElements.get("block-preview")) {
  customElements.define("block-preview", BlockPreview);
}
