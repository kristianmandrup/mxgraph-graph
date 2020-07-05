import { Graph } from ".";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxStackLayout, mxEvent, mxGraph } = mx;

export class CellFolder {
  graph: Graph;
  getFoldableCells: any; // (cells) => any
  getSelectionCells: any; // () => any
  setSelectionCells: any; // (cell) => void
  getCellGeometry: any;
  getCellsBeyond: any; // (cell) => [any]
  isEnabled: any;

  isCellLocked: any; // (cell)
  foldingEnabled: boolean = true;
  getCurrentCellStyle: any;

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  get model() {
    return this.graph.model;
  }

  get view() {
    return this.graph.view;
  }

  get layoutManager() {
    return this.graph.layoutManager;
  }

  isContainer(cell) {
    return this.graph.isContainer(cell);
  }

  /**
   * Disables folding for non-swimlanes.
   */
  isCellFoldable(cell) {
    var style = this.getCurrentCellStyle(cell);

    return (
      this.foldingEnabled &&
      (style["treeFolding"] == "1" ||
        (!this.isCellLocked(cell) &&
          ((this.isContainer(cell) && style["collapsible"] != "0") ||
            (!this.isContainer(cell) && style["collapsible"] == "1"))))
    );
  }

  /**
   * Adds Shift+collapse/expand and size management for folding inside stack
   */
  foldCells(collapse, recurse, cells, checkFoldable, evt) {
    recurse = recurse != null ? recurse : false;

    if (cells == null) {
      cells = this.getFoldableCells(this.getSelectionCells(), collapse);
    }

    if (cells != null) {
      this.model.beginUpdate();

      try {
        mxGraph.prototype.foldCells.apply(this, [
          collapse,
          recurse,
          cells,
          checkFoldable,
          evt,
        ]);

        // Resizes all parent stacks if alt is not pressed
        if (this.layoutManager != null) {
          for (var i = 0; i < cells.length; i++) {
            var state = this.view.getState(cells[i]);
            var geo = this.getCellGeometry(cells[i]);

            if (state != null && geo != null) {
              var dx = Math.round(geo.width - state.width / this.view.scale);
              var dy = Math.round(geo.height - state.height / this.view.scale);

              if (dy != 0 || dx != 0) {
                var parent = this.model.getParent(cells[i]);
                var layout = this.layoutManager.getLayout(parent);

                if (layout == null) {
                  // Moves cells to the right and down after collapse/expand
                  if (evt != null && this.isMoveCellsEvent(evt, state)) {
                    this.moveSiblings(state, parent, dx, dy);
                  }
                } else if (
                  (evt == null || !mxEvent.isAltDown(evt)) &&
                  layout.constructor == mxStackLayout &&
                  !layout.resizeLast
                ) {
                  this.resizeParentStacks(parent, layout, dx, dy);
                }
              }
            }
          }
        }
      } finally {
        this.model.endUpdate();
      }

      // Selects cells after folding
      if (this.isEnabled()) {
        this.setSelectionCells(cells);
      }
    }
  }

  /**
   * Overrides label orientation for collapsed swimlanes inside stack.
   */
  moveSiblings(state, parent, dx, dy) {
    this.model.beginUpdate();
    try {
      var cells = this.getCellsBeyond(state.x, state.y, parent, true, true);

      for (var i = 0; i < cells.length; i++) {
        if (cells[i] != state.cell) {
          var tmp = this.view.getState(cells[i]);
          var geo = this.getCellGeometry(cells[i]);

          if (tmp != null && geo != null) {
            geo = geo.clone();
            geo.translate(
              Math.round(
                dx * Math.max(0, Math.min(1, (tmp.x - state.x) / state.width))
              ),
              Math.round(
                dy * Math.max(0, Math.min(1, (tmp.y - state.y) / state.height))
              )
            );
            this.model.setGeometry(cells[i], geo);
          }
        }
      }
    } finally {
      this.model.endUpdate();
    }
  }

  /**
   * Overrides label orientation for collapsed swimlanes inside stack.
   */
  resizeParentStacks(parent, layout, dx, dy) {
    if (
      this.layoutManager != null &&
      layout != null &&
      layout.constructor == mxStackLayout &&
      !layout.resizeLast
    ) {
      this.model.beginUpdate();
      try {
        var dir = layout.horizontal;

        // Bubble resize up for all parent stack layouts with same orientation
        while (
          parent != null &&
          layout != null &&
          layout.constructor == mxStackLayout &&
          layout.horizontal == dir &&
          !layout.resizeLast
        ) {
          var pgeo = this.getCellGeometry(parent);
          var pstate = this.view.getState(parent);

          if (pstate != null && pgeo != null) {
            pgeo = pgeo.clone();

            if (layout.horizontal) {
              pgeo.width +=
                dx + Math.min(0, pstate.width / this.view.scale - pgeo.width);
            } else {
              pgeo.height +=
                dy + Math.min(0, pstate.height / this.view.scale - pgeo.height);
            }

            this.model.setGeometry(parent, pgeo);
          }

          parent = this.model.getParent(parent);
          layout = this.layoutManager.getLayout(parent);
        }
      } finally {
        this.model.endUpdate();
      }
    }
  }

  /**
   * Adds Shift+collapse/expand and size management for folding inside stack
   */
  isMoveCellsEvent(evt, state) {
    return (
      mxEvent.isShiftDown(evt) ||
      mxUtils.getValue(state.style, "moveCells", "0") == "1"
    );
  }
}
