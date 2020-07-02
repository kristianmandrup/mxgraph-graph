import mx from "@mxgraph-app/mx";
import { HoverIcons } from "../../hover/HoverIcons";
import resources from "@mxgraph-app/resources";
const { mxClient, mxImage } = mx;
const { IMAGE_PATH } = resources;

export class CellRendererConfig {
  createSvgImage: any;

  configure() {
    const { createSvgImage } = this;
    const { arrowFill } = HoverIcons.prototype;
    /**
     * Defines the handles for the UI. Uses data-URIs to speed-up loading time where supported.
     */
    // TODO: Increase handle padding
    const mainHandle = !mxClient.IS_SVG
      ? new mxImage(IMAGE_PATH + "/handle-main.png", 17, 17)
      : createSvgImage(
          18,
          18,
          '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' +
            arrowFill +
            '" stroke-width="1"/>'
        );
    const secondaryHandle = !mxClient.IS_SVG
      ? new mxImage(IMAGE_PATH + "/handle-secondary.png", 17, 17)
      : createSvgImage(
          16,
          16,
          '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>'
        );
    const fixedHandle = !mxClient.IS_SVG
      ? new mxImage(IMAGE_PATH + "/handle-fixed.png", 17, 17)
      : createSvgImage(
          18,
          18,
          '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' +
            arrowFill +
            '" stroke-width="1"/><path d="m 7 7 L 11 11 M 7 11 L 11 7" stroke="#fff"/>'
        );
    const terminalHandle = !mxClient.IS_SVG
      ? new mxImage(IMAGE_PATH + "/handle-terminal.png", 17, 17)
      : createSvgImage(
          18,
          18,
          '<circle cx="9" cy="9" r="5" stroke="#fff" fill="' +
            arrowFill +
            '" stroke-width="1"/><circle cx="9" cy="9" r="2" stroke="#fff" fill="transparent"/>'
        );
    const rotationHandle = !mxClient.IS_SVG
      ? new mxImage(IMAGE_PATH + "/handle-rotate.png", 16, 16)
      : createSvgImage(
          16,
          16,
          '<path stroke="' +
            arrowFill +
            '" fill="' +
            arrowFill +
            '" d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>',
          24,
          24
        );

    const imgMap = {
      mainHandle,
      secondaryHandle,
      fixedHandle,
      terminalHandle,
      rotationHandle,
    };

    Object.entries(imgMap).map(([key, value]) => {
      HoverIcons.prototype[key] = value;
    });

    return HoverIcons;
  }
}
