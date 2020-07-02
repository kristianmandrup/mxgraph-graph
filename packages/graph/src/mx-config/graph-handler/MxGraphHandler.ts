import mx from "@mxgraph-app/mx";
const { mxRectangle, mxUtils, mxEvent, mxGraphHandler } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";
import { formatHintText } from "../helpers";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxGraphHandler = Class.extend({
  $$init: function (graph) {
    mxGraphHandler.apply(this, [graph]);
  },

  maxLivePreview: 16,

  moveCells: function (_cells, _dx, _dy, _clone, target, evt) {
    var mxGraphHandlerMoveCells = mxGraphHandler.prototype.moveCells;
    if (mxEvent.isAltDown(evt)) {
      target = null;
    }

    mxGraphHandlerMoveCells.apply(this, [
      _cells,
      _dx,
      _dy,
      _clone,
      target,
      evt,
    ]);
  },

  /**
   * Updates the hint for the current operation.
   */
  updateHint: function (_me) {
    const {
      pBounds,
      shape,
      livePreviewActive,
      hint,
      createHint,
      graph,
      roundLength,
      currentDx,
      currentDy,
      bounds,
      hintOffset,
    } = this;

    if (pBounds != null && (shape != null || livePreviewActive)) {
      if (hint == null) {
        this.hint = createHint();
        graph.container.appendChild(this.hint);
      }

      var t = graph.view.translate;
      var s = graph.view.scale;
      var x = roundLength((bounds.x + currentDx) / s - t.x);
      var y = roundLength((bounds.y + currentDy) / s - t.y);
      var unit = this.graph.view.unit;

      this.hint.innerHTML =
        formatHintText(x, unit) + ", " + formatHintText(y, unit);

      this.hint.style.left =
        this.pBounds.x +
        this.currentDx +
        Math.round((this.pBounds.width - this.hint.clientWidth) / 2) +
        "px";
      this.hint.style.top =
        this.pBounds.y +
        this.currentDy +
        this.pBounds.height +
        hintOffset +
        "px";
    }
  },

  /**
   * Updates the hint for the current operation.
   */
  removeHint: function () {
    if (this.hint != null) {
      this.hint.parentNode.removeChild(this.hint);
      this.hint = null;
    }
  },

  // Ignores child cells with part style as guides

  getGuideStates: function () {
    const mxGraphHandlerGetGuideStates =
      mxGraphHandler.prototype.getGuideStates;
    const states: any = mxGraphHandlerGetGuideStates.apply(this, []);
    const result: any[] = [];

    // NOTE: Could do via isStateIgnored hook
    for (var i = 0; i < states.length; i++) {
      if (mxUtils.getValue(states[i].style, "part", "0") != "1") {
        result.push(states[i]);
      }
    }

    return result;
  },

  // Special case for single edge label handle moving in which case the text bounding box is used

  getBoundingBox: function (cells) {
    const mxGraphHandlerGetBoundingBox =
      mxGraphHandler.prototype.getBoundingBox;
    if (cells != null && cells.length == 1) {
      var model = this.graph.getModel();
      var parent = model.getParent(cells[0]);
      var geo = this.graph.getCellGeometry(cells[0]);

      if (model.isEdge(parent) && geo != null && geo.relative) {
        var state = this.graph.view.getState(cells[0]);

        if (
          state != null &&
          state.width < 2 &&
          state.height < 2 &&
          state.text != null &&
          state.text.boundingBox != null
        ) {
          return mxRectangle.fromRectangle(state.text.boundingBox);
        }
      }
    }

    return mxGraphHandlerGetBoundingBox.apply(this, [cells]);
  },
});
