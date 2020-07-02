import mx from "@mxgraph-app/mx";
const { mxGuide, mxPolyline, mxConstants } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxGuide = Class.extend({
  $$init: function (graph, states) {
    mxGuide.apply(this, [graph, states]);
  },

  /**
   * No dashed shapes.
   */
  createGuideShape: function (_horizontal) {
    var guide = new mxPolyline(
      [],
      mxConstants.GUIDE_COLOR,
      mxConstants.GUIDE_STROKEWIDTH
    );

    return guide;
  },
});
