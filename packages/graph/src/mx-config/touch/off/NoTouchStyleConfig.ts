import mx from "@mxgraph-app/mx";
const { mxPanningHandler, mxEvent } = mx;
import { Class } from "../../Class";

const MxPanningHandler = Class.extend({
  $$init: function (graph) {
    mxPanningHandler.apply(this, [graph]);
  },

  isPanningTrigger: function (me) {
    var evt = me.getEvent();

    return (
      (mxEvent.isLeftMouseButton(evt) &&
        ((this.useLeftButtonForPanning && me.getState() == null) ||
          (mxEvent.isControlDown(evt) && !mxEvent.isShiftDown(evt)))) ||
      (this.usePopupTrigger && mxEvent.isPopupTrigger(evt))
    );
  },
});

export const off = {
  MxPanningHandler,
};
