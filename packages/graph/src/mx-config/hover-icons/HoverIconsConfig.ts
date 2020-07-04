import { HoverIcons } from "../../hover/HoverIcons";
import { imgMap } from "./images";

export class HoverIconsConfig {
  configure() {
    /**
     * Defines the handles for the UI. Uses data-URIs to speed-up loading time where supported.
     */
    Object.entries(imgMap).map(([key, value]) => {
      HoverIcons.prototype[key] = value;
    });

    return HoverIcons;
  }
}
