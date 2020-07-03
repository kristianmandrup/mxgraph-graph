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

// /**
//  * Function: repaint
//  *
//  * Updates the highlight after a change of the model or view.
//  */
// setStrokeWidthFn() {
//   mxCellHighlight.prototype.getStrokeWidth = (_state) => {
//     var s = this.strokeWidth;

//     if (this.graph.useCssTransforms) {
//       s /= this.graph.currentScale;
//     }

//     return s;
//   };
// }

// /**
//  * Function: getGraphBounds
//  *
//  * Overrides getGraphBounds to use bounding box from SVG.
//  */
// setGraphBoundsFn() {
//   mxGraphView.prototype.getGraphBounds();
//   {
//     var b = this.graphBounds;

//     if (this.graph.useCssTransforms) {
//       var t = this.graph.currentTranslate;
//       var s = this.graph.currentScale;

//       b = new mxRectangle(
//         (b.x + t.x) * s,
//         (b.y + t.y) * s,
//         b.width * s,
//         b.height * s
//       );
//     }

//     return b;
//   }
// }

// /**
//  * Function: viewStateChanged
//  *
//  * Overrides to bypass full cell tree validation.
//  * TODO: Check if this improves performance
//  */
// setStateViewChanged() {
//   const proto = mxGraphView.prototype;
//   mxGraphView.prototype["viewStateChanged"] = () => {
//     if (this.graph.useCssTransforms) {
//       proto.validate();
//       this.graph.sizeDidChange();
//     } else {
//       proto.revalidate();
//       this.graph.sizeDidChange();
//     }
//   };
// }

// /**
//  * Function: validate
//  *
//  * Overrides validate to normalize validation view state and pass
//  * current state to CSS transform.
//  */
// setValidate() {
//   var graphViewValidate = mxGraphView.prototype.validate;
//   const proto = mxGraphView.prototype;

//   mxGraphView.prototype.validate = (cell) => {
//     const { scale, translate } = proto;
//     if (this.graph.useCssTransforms) {
//       this.graph.currentScale = scale;
//       this.graph.currentTranslate.x = translate.x;
//       this.graph.currentTranslate.y = translate.y;

//       proto.scale = 1;
//       proto.translate.x = 0;
//       proto.translate.y = 0;
//     }

//     graphViewValidate.apply(this, [cell]);

//     if (this.graph.useCssTransforms) {
//       this.graph.updateCssTransform();

//       proto.scale = this.graph.currentScale;
//       proto.translate.x = this.graph.currentTranslate.x;
//       proto.translate.y = this.graph.currentTranslate.y;
//     }
//   };
// }

// setValidateCellState() {
//   /**
//    * Updates jumps for valid edges and repaints if needed.
//    */
//   var mxGraphViewValidateCellState = mxGraphView.prototype.validateCellState;
//   const proto = mxGraphView.prototype;
//   mxGraphView.prototype.validateCellState = (cell, recurse) => {
//     recurse = recurse != null ? recurse : true;
//     var state = proto.getState(cell);

//     const { graph } = proto;

//     // Forces repaint if jumps change on a valid edge
//     if (
//       state != null &&
//       recurse &&
//       graph.model.isEdge(state.cell) &&
//       state.style != null &&
//       state.style[mxConstants.STYLE_CURVED] != 1 &&
//       !state.invalid &&
//       proto["updateLineJumps"](state)
//     ) {
//       graph.cellRenderer.redraw(state, false, proto.isRendering());
//     }

//     state = mxGraphViewValidateCellState.apply(this, [cell, recurse]);

//     // Adds to the list of edges that may intersect with later edges
//     if (
//       state != null &&
//       recurse &&
//       graph.model.isEdge(state.cell) &&
//       state.style != null &&
//       state.style[mxConstants.STYLE_CURVED] != 1
//     ) {
//       // LATER: Reuse jumps for valid edges
//       this["validEdges"].push(state);
//     }

//     return state;
//   };
// }

// /**
//  * Updates jumps for invalid edges.
//  */
// setUpdateCellState() {
//   var mxGraphViewUpdateCellState = mxGraphView.prototype.updateCellState;
//   const proto = mxGraphView.prototype;
//   mxGraphView.prototype.updateCellState = (state) => {
//     mxGraphViewUpdateCellState.apply(this, [state]);
//     const { graph } = proto;

//     // Updates jumps on invalid edge before repaint
//     if (
//       graph.model.isEdge(state.cell) &&
//       state.style[mxConstants.STYLE_CURVED] != 1
//     ) {
//       this["updateLineJumps"](state);
//     }
//   };
// }

// /**
//  * Adds support for snapToPoint style.
//  */
// setUpdateFloatingTerminalPoint() {
//   var mxGraphViewUpdateFloatingTerminalPoint =
//     mxGraphView.prototype.updateFloatingTerminalPoint;
//   const proto = mxGraphView.prototype;
//   mxGraphView.prototype.updateFloatingTerminalPoint = (
//     edge,
//     start,
//     end,
//     source
//   ) => {
//     if (
//       start != null &&
//       edge != null &&
//       (start.style["snapToPoint"] == "1" || edge.style["snapToPoint"] == "1")
//     ) {
//       start = proto.getTerminalPort(edge, start, source);
//       var next = proto.getNextPoint(edge, end, source);

//       var orth = proto.graph.isOrthogonal(edge);
//       var alpha = mxUtils.toRadians(
//         Number(start.style[mxConstants.STYLE_ROTATION] || "0")
//       );
//       var center = new mxPoint(start.getCenterX(), start.getCenterY());

//       if (alpha != 0) {
//         var cos = Math.cos(-alpha);
//         var sin = Math.sin(-alpha);
//         next = mxUtils.getRotatedPoint(next, cos, sin, center);
//       }

//       var border = parseFloat(
//         edge.style[mxConstants.STYLE_PERIMETER_SPACING] || 0
//       );
//       border += parseFloat(
//         edge.style[
//           source
//             ? mxConstants.STYLE_SOURCE_PERIMETER_SPACING
//             : mxConstants.STYLE_TARGET_PERIMETER_SPACING
//         ] || 0
//       );
//       var pt = proto.getPerimeterPoint(
//         start,
//         next,
//         alpha == 0 && orth,
//         border
//       );

//       if (alpha != 0) {
//         var cos = Math.cos(alpha);
//         var sin = Math.sin(alpha);
//         pt = mxUtils.getRotatedPoint(pt, cos, sin, center);
//       }

//       edge.setAbsoluteTerminalPoint(
//         proto["snapToAnchorPoint"](edge, start, end, source, pt),
//         source
//       );
//     } else {
//       mxGraphViewUpdateFloatingTerminalPoint.apply(this, [
//         edge,
//         start,
//         end,
//         source,
//       ]);
//     }
//   };
// }

// setSnapToAnchorPoint() {
//   const proto = mxGraphView.prototype;
//   const { graph } = proto;
//   mxGraphView.prototype["snapToAnchorPoint"] = (
//     edge,
//     start,
//     _end,
//     _source,
//     pt
//   ) => {
//     if (start != null && edge != null) {
//       var constraints = graph.getAllConnectionConstraints(start, null);
//       var nearest: any;
//       var dist: any;

//       if (constraints != null) {
//         for (var i = 0; i < constraints.length; i++) {
//           var cp = graph.getConnectionPoint(start, constraints[i]);

//           if (cp != null) {
//             var tmp =
//               (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

//             if (dist == null || tmp < dist) {
//               nearest = cp;
//               dist = tmp;
//             }
//           }
//         }
//       }

//       if (nearest != null) {
//         pt = nearest;
//       }
//     }

//     return pt;
//   };
// }

// /**
//  * Reset the list of processed edges.
//  */
// setResetValidationState() {
//   var mxGraphViewResetValidationState =
//     mxGraphView.prototype.resetValidationState;
//   let proto = mxGraphView.prototype;
//   mxGraphView.prototype.resetValidationState = () => {
//     mxGraphViewResetValidationState.apply(this, []);

//     proto["validEdges"] = [];
//   };
// }
