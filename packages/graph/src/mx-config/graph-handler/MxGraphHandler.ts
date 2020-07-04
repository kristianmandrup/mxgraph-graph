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

  // Disables removing relative children from parents
  shouldRemoveCellsFromParent: function (parent, cells, evt) {
    const mxGraphHandlerShouldRemoveCellsFromParent =
      mxGraphHandler.prototype.shouldRemoveCellsFromParent;
    for (var i = 0; i < cells.length; i++) {
      if (this.graph.getModel().isVertex(cells[i])) {
        var geo = this.graph.getCellGeometry(cells[i]);
        if (geo != null && geo.relative) {
          return false;
        }
      }
    }
    return mxGraphHandlerShouldRemoveCellsFromParent.apply(this, [
      parent,
      cells,
      evt,
    ]);
  },

  // Delayed selection of parent group
  selectDelayed: function (me) {
    if (!this.graph.popupMenuHandler.isPopupTrigger(me)) {
      var cell = me.getCell();
      if (cell == null) {
        cell = this.cell;
      }

      // Selects folded cell for hit on folding icon
      var state = this.graph.view.getState(cell);

      if (state != null && me.isSource(state.control)) {
        this.graph.selectCellForEvent(cell, me.getEvent());
      } else {
        var model = this.graph.getModel();
        var parent = model.getParent(cell);

        while (!this.graph.isCellSelected(parent) && model.isVertex(parent)) {
          cell = parent;
          parent = model.getParent(cell);
        }

        this.graph.selectCellForEvent(cell, me.getEvent());
      }
    }
  },

  // Selection is delayed to mouseup if ancestor is selected
  isDelayedSelection: function (cell, me) {
    const graphHandlerIsDelayedSelection =
      mxGraphHandler.prototype.isDelayedSelection;

    var result = graphHandlerIsDelayedSelection.apply(this, [cell, me]);
    if (!result) {
      var model = this.graph.getModel();
      var parent = model.getParent(cell);

      while (parent != null) {
        // Inconsistency for unselected parent swimlane is intended for easier moving
        // of stack layouts where the container title section is too far away
        if (this.graph.isCellSelected(parent) && model.isVertex(parent)) {
          result = true;
          break;
        }
        parent = model.getParent(parent);
      }
    }
    return result;
  },

  // Selects ancestors before descendants
  getInitialCellForEvent: function (me) {
    const graphHandlerGetInitialCellForEvent =
      mxGraphHandler.prototype.getInitialCellForEvent;

    var model = this.graph.getModel();
    var psel = model.getParent(this.graph.getSelectionCell());
    var cell = graphHandlerGetInitialCellForEvent.apply(this, [me]);
    var parent = model.getParent(cell);

    if (psel == null || (psel != cell && psel != parent)) {
      while (
        !this.graph.isCellSelected(cell) &&
        !this.graph.isCellSelected(parent) &&
        model.isVertex(parent) &&
        !this.graph.isContainer(parent)
      ) {
        cell = parent;
        parent = this.graph.getModel().getParent(cell);
      }
    }
    return cell;
  },

  // Enables guides
  guidesEnabled: true,

  // Removes parents where all child cells are moved out
  removeEmptyParents: true,
});
