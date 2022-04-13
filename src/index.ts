import AppZaubercode from "./app-zaubercode";
import BlockSelector from "./components/block-selector";

if (!customElements.get("app-zaubercode")) {
  customElements.define("app-zaubercode", AppZaubercode);
}

if (!customElements.get("block-selector")) {
  customElements.define("block-selector", BlockSelector);
}
