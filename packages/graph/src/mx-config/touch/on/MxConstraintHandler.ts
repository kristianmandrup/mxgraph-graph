import mx from "@mxgraph-app/mx";
const { mxEvent, mxGraphHandler } = mx;
import { Class } from "../../Class";

export const MxConstraintHandler = Class.extend({
  $$init: function (graph) {
    mxGraphHandler.apply(this, [graph]);
  },

  // Implements a smaller tolerance for mouse events and a larger tolerance for touch
  // events on touch devices. The default tolerance (4px) is used for mouse events.
  getTolerance: function (me) {
    return mxEvent.isMouseEvent(me.getEvent()) ? 4 : this.graph.getTolerance();
  },
});
