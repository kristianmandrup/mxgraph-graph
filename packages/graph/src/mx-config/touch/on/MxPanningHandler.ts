import mx from "@mxgraph-app/mx";
const { mxPanningHandler, mxEvent } = mx;
import { Class } from "../../Class";

export const MxPanningHandler = Class.extend({
  $$init: function (graph) {
    mxPanningHandler.apply(this, [graph]);
  },

  // One finger pans (no rubberband selection) must start regardless of mouse button
  isPanningTrigger: function (me) {
    var evt = me.getEvent();

    return (
      (me.getState() == null && !mxEvent.isMouseEvent(evt)) ||
      (mxEvent.isPopupTrigger(evt) &&
        (me.getState() == null ||
          mxEvent.isControlDown(evt) ||
          mxEvent.isShiftDown(evt)))
    );
  },
});
