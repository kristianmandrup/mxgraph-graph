import mx from "@mxgraph-app/mx";
import { HoverIcons } from "../../hover/HoverIcons";
const { mxConstraintHandler, mxEvent, mxClient } = mx;

export class ConstraintHandlerConfig {
  createSvgImage: any;
  arrowFill = HoverIcons.prototype.arrowFill;

  // isEnabled: function () {
  //   return this.graph.connectionHandler.isEnabled();
  // },

  setUpdate() {
    var mxConstraintHandlerUpdate = mxConstraintHandler.prototype.update;
    const { isKeepFocusEvent, reset } = mxConstraintHandler.prototype;

    mxConstraintHandler.prototype.update = (me, source, ...args) => {
      if (isKeepFocusEvent(me) || !mxEvent.isAltDown(me.getEvent())) {
        mxConstraintHandlerUpdate.apply(this, [me, source, ...args]);
      } else {
        reset();
      }
    };
  }

  setPointImage() {
    const { createSvgImage, arrowFill } = this;
    if (mxClient.IS_SVG) {
      mxConstraintHandler.prototype.pointImage = createSvgImage(
        5,
        5,
        '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="' + arrowFill + '"/>'
      );
    }
  }
}

//   // Overrides highlight shape for connection points
//   mxConstraintHandler.prototype.createHighlightShape = () => {
//     var hl = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
//     hl.opacity = mxConstants.HIGHLIGHT_OPACITY;

//     return hl;
//   }; // Overrides edge preview to use current edge shape and default style
// }
