import mx from "@mxgraph-app/mx";
const { mxCellHighlight } = mx;

export class CellHighlightConfig {
  config() {
    mxCellHighlight.prototype.keepOnTop = true;
    return mxCellHighlight;
  }
}
