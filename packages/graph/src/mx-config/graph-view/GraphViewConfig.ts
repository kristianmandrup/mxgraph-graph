import mx from "@mxgraph-app/mx";
import { formatHintText } from "../helpers";
const { mxGraphView } = mx;

export class CellRendererConfig {
  configure() {
    this.setFormatUnitText();

    return mxGraphView;
  }

  setFormatUnitText() {
    const proto = mxGraphView.prototype;
    mxGraphView.prototype.formatUnitText = (pixels) => {
      return pixels ? formatHintText(pixels, proto.unit) : pixels;
    };
  }
}
