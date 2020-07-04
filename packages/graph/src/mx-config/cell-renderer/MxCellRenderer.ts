import mx from "@mxgraph-app/mx";
import pako from "pako";
const { mxConstants, mxStencil, mxShape, mxUtils, mxCellRenderer } = mx;

const Graph: any = {};

import { Class } from "../Class";

export const MxCellRenderer = Class.extend({
  /**
   * Handling of special nl2Br style for not converting newlines to breaks in HTML labels.
   * NOTE: Since it's easier to set this when the label is created we assume that it does
   * not change during the lifetime of the mxText instance.
   */
  initializeLabel: function (state, _shape) {
    const mxCellRendererInitializeLabel =
      mxCellRenderer.prototype.initializeLabel;

    if (state.text != null) {
      state.text.replaceLinefeeds =
        mxUtils.getValue(state.style, "nl2Br", "1") != "0";
    }

    mxCellRendererInitializeLabel.apply(this, [state, _shape]);
  },

  /**
   * Forces repaint if routed points have changed.
   */

  isShapeInvalid: function (state, shape) {
    const mxCellRendererIsShapeInvalid =
      mxCellRenderer.prototype.isShapeInvalid;
    return (
      mxCellRendererIsShapeInvalid.apply(this, [state, shape]) ||
      (state.routedPoints != null &&
        shape.routedPoints != null &&
        !mxUtils.equalPoints(shape.routedPoints, state.routedPoints))
    );
  },

  /**
   * Adds custom stencils defined via shape=stencil(value) style. The value is a base64 encoded, compressed and
   * URL encoded XML definition of the shape according to the stencil definition language of mxstatic
   *
   * Needs to be in this file to make sure its part of the embed client code. Also the check for ZLib is
   * different than for the Editor code.
   */

  createShape: function (state) {
    var mxCellRendererCreateShape = mxCellRenderer.prototype.createShape;
    if (state.style != null && typeof pako !== "undefined") {
      var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

      // Extracts and decodes stencil XML if shape has the form shape=stencil(value)
      if (
        shape != null &&
        typeof shape === "string" &&
        shape.substring(0, 8) == "stencil("
      ) {
        try {
          var stencil = shape.substring(8, shape.length - 1);
          var doc = mxUtils.parseXml(Graph.decompress(stencil, null, null));

          return new mxShape(new mxStencil(doc.documentElement));
        } catch (e) {
          if (window.console != null) {
            console.log("Error in shape: " + e);
          }
        }
      }
    }

    return mxCellRendererCreateShape.apply(this, [state]);
  },
});
