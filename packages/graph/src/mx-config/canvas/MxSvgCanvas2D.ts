import mx from "@mxgraph-app/mx";
const { mxSvgCanvas2D } = mx;
import { Class } from "../Class";

export const MxSvgCanvas2D = Class.extend([mxSvgCanvas2D], {
  // Alternative text for unsupported foreignObjects
  foAltText: "[Not supported by viewer]",
});
