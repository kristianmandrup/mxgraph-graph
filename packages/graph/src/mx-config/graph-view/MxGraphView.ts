import mx from "@mxgraph-app/mx";
const { mxGraphView } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";
import { formatHintText } from "../helpers";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxGraphView = Class.extend({
  $$init: function (graph) {
    mxGraphView.apply(this, [graph]);
  },

  formatUnitText: function (pixels) {
    return pixels ? formatHintText(pixels, this.unit) : pixels;
  },
});
