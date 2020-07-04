import mx from "@mxgraph-app/mx";
import { HoverIcons } from "../../hover/HoverIcons";
const { mxEllipse, mxConstraintHandler, mxEvent, mxConstants } = mx;
import { Class } from "../Class";
import { Graph } from "../../graph";

const { createSvgImage } = Graph;
const proto = HoverIcons.prototype;
const { arrowFill } = proto;

export const MxConstraintHandler = Class.extend({
  isEnabled: function () {
    return this.graph.connectionHandler.isEnabled();
  },

  update: function (me, source, existingEdge, point) {
    const { isKeepFocusEvent, reset } = this;
    var mxConstraintHandlerUpdate = mxConstraintHandler.prototype.update;

    if (isKeepFocusEvent(me) || !mxEvent.isAltDown(me.getEvent())) {
      mxConstraintHandlerUpdate.apply(this, [me, source, existingEdge, point]);
    } else {
      reset();
    }
  },

  // if (mxClient.IS_SVG) {
  pointImage: createSvgImage(
    5,
    5,
    '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="' + arrowFill + '"/>'
  ),

  // Overrides highlight shape for connection points
  createHighlightShape: function () {
    var hl = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
    hl.opacity = mxConstants.HIGHLIGHT_OPACITY;
    return hl;
  },
});
