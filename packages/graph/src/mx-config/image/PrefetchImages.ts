import mx from "@mxgraph-app/mx";
import { HoverIcons } from "../../hover/HoverIcons";
const { mxClient } = mx;

export class PrefetchImages {
  proto: any = HoverIcons.prototype;

  imgs = [
    "mainHandle",
    "fixedHandle",
    "terminalHandle",
    "secondaryHandle",
    "rotationHandle",
    "triangleUp",
    "triangleRight",
    "triangleDown",
    "triangleLeft",
    "refreshTarget",
    "roundDrop",
  ];

  prefetch() {
    const { createImage } = this;
    // Pre-fetches images (only needed for non data-uris)
    if (!mxClient.IS_SVG) {
      this.imgs.map((imgName) => {
        createImage(imgName);
      });
    }
  }

  createImage = (name) => {
    return (new Image().src = this.proto[name].src);
  };
}
