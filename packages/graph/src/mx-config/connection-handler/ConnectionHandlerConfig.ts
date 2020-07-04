import mx from "@mxgraph-app/mx";
const {
  mxCellState,
  mxConstants,
  mxEvent,
  mxCellMarker,
  mxConnectionHandler,
} = mx;
import { Class } from "../Class";

export const MxConnectionHandler = Class.extend({
  // Disables connection points
  $$init: function () {
    var connectionHandlerInit = mxConnectionHandler.prototype.init;
    connectionHandlerInit.apply(this, []);
  },

  outlineConnect: true,

  // Overrides to ignore hotspot only for target terminal
  createMarker: function () {
    const mxConnectionHandlerCreateMarker =
      mxConnectionHandler.prototype.createMarker;

    var marker = mxConnectionHandlerCreateMarker.apply(this);

    marker.intersects = (state, evt) => {
      if (this.isConnecting()) {
        return true;
      }
      return mxCellMarker.prototype.intersects.apply(marker, [state, evt]);
    };

    return marker;
  },

  // Extends connection handler to enable ctrl+drag for cloning source cell
  // since copyOnConnect is now disabled by default
  isCreateTarget: function (evt) {
    var mxConnectionHandlerCreateTarget =
      mxConnectionHandler.prototype.isCreateTarget;

    return (
      mxEvent.isControlDown(evt) ||
      mxConnectionHandlerCreateTarget.apply(this, [evt])
    );
  },

  livePreview: true,
  cursor: "crosshair",

  // Uses current edge style for connect preview
  createEdgeState: function (_me) {
    var style = this.graph.createCurrentEdgeStyle();
    var edge = this.graph.createEdge(null, null, null, null, null, style);
    var state = new mxCellState(
      this.graph.view,
      edge,
      this.graph.getCellStyle(edge)
    );

    for (var key in this.graph.currentEdgeStyle) {
      state.style[key] = this.graph.currentEdgeStyle[key];
    }

    return state;
  },

  // Overrides dashed state with current edge style
  createShape: function () {
    const connectionHandlerCreateShape =
      mxConnectionHandler.prototype.createShape;

    var shape = connectionHandlerCreateShape.apply(this, []);

    shape.isDashed =
      this.graph.currentEdgeStyle[mxConstants.STYLE_DASHED] == "1";

    return shape;
  },

  // Overrides live preview to keep current style
  updatePreview: function (_valid) {
    // do not change color of preview
  },

  // Overrides connection handler to ignore edges instead of not allowing connections
  // createMarker: function () {
  //   const mxConnectionHandlerCreateMarker =
  //   mxConnectionHandler.prototype.createMarker;

  //   var marker = mxConnectionHandlerCreateMarker.apply(this, []);
  //   var markerGetCell = marker.getCell;
  //   marker.getCell = (_me) => {
  //     var result = markerGetCell.apply(this, arguments);
  //     this.error = null;
  //     return result;
  //   };

  //   return marker;
  // }
});
