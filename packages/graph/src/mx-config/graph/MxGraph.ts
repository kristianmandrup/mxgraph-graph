import mx from "@mxgraph-app/mx";
const { mxUtils, mxConstants, mxPoint, mxGraph } = mx;
import { Class } from "../Class";

export const MxPopupMenuhandler = Class.extend({
  updatePageBreaks: function (visible, width, height) {
    const graphUpdatePageBreaks = mxGraph.prototype.updatePageBreaks;
    var useCssTranforms = this.useCssTransforms,
      scale = this.view.scale,
      translate = this.view.translate;

    if (useCssTranforms) {
      this.view.scale = 1;
      this.view.translate = new mxPoint(0, 0);
      this.useCssTransforms = false;
    }

    graphUpdatePageBreaks.apply(this, [visible, width, height]);

    if (useCssTranforms) {
      this.view.scale = scale;
      this.view.translate = translate;
      this.useCssTransforms = true;
    }
  },
  // Add panning for background page in VML
  panGraph: function (dx, dy) {
    const graphPanGraph = mxGraph.prototype.panGraph;
    graphPanGraph.call(this, dx, dy);
    if (
      this.dialect != mxConstants.DIALECT_SVG &&
      this.view.backgroundPageShape != null &&
      (!this.useScrollbarsForPanning || !mxUtils.hasScrollbars(this.container))
    ) {
      this.view.backgroundPageShape.node.style.marginLeft = dx + "px";
      this.view.backgroundPageShape.node.style.marginTop = dy + "px";
    }
  },
});
