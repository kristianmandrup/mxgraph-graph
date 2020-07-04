import mx from "@mxgraph-app/mx";
import { Base } from "../base";
const { mxCellHighlight } = mx;

export const MxCellHighlight = Base.extend([mxCellHighlight], {
  keepOnTop: true,

  /**
   * Function: repaint
   *
   * Updates the highlight after a change of the model or view.
   */

  getStrokeWidth: function (_state) {
    var s = this.strokeWidth;

    if (this.graph.useCssTransforms) {
      s = this.graph.currentScale;
    }

    return s;
  },
});
