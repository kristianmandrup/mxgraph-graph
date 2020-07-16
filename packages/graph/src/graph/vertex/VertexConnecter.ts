import { Graph } from "../Graph";
import mx from "@mxgraph-app/mx";
const {
  mxEventObject,
  mxStackLayout,
  mxGraph,
  mxUtils,
  mxPoint,
  mxEvent,
  mxConstants,
} = mx;

export class VertexConnecter {
  setSelectionCells: any; // (cell) => void
  setSelectionCell: any; // (cell) => void
  scrollCellToVisible: any; // (cell) => any
  getCellAt: any; // (x, y) => any
  isCellLocked: any; // (cell) => boolean
  getCurrentCellStyle: any;
  isSwimlane: any; // (cell) => boolean
  getCellGeometry: any; // (cell) => any
  getCompositeParent: any; // (cell) => any
  duplicateCells: any; // (any[]) => any[]
  addCells: any; // ([realTarget], target, null, null, null, true)
  insertEdge: any; // (mxGraph)
  createCurrentEdgeStyle: any; // () => void
  connectionHandler: any;

  graph: Graph;

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  getModel() {
    return this.graph.getModel();
  }

  get layoutManager() {
    return this.graph.layoutManager;
  }

  get view() {
    return this.graph.view;
  }

  get model() {
    return this.graph.model;
  }

  /**
   * Adds a connectable style.
   */
  isCellConnectable(cell) {
    var style = this.getCurrentCellStyle(cell);

    return style["connectable"] != null
      ? style["connectable"] != "0"
      : mxGraph.prototype.isCellConnectable.apply(this, [cell]);
  }

  /**
   * Selects cells for connect vertex return value.
   */
  selectCellsForConnectVertex(cells, evt, hoverIcons) {
    // Selects only target vertex if one exists
    if (cells.length == 2 && this.model.isVertex(cells[1])) {
      this.setSelectionCell(cells[1]);
      this.scrollCellToVisible(cells[1]);

      if (hoverIcons != null) {
        // Adds hover icons for cloned vertex or hides icons
        if (mxEvent.isTouchEvent(evt)) {
          hoverIcons.update(hoverIcons.getState(this.view.getState(cells[1])));
        } else {
          hoverIcons.reset();
        }
      }
    } else {
      this.setSelectionCells(cells);
    }
  }

  /**
   * Adds a connection to the given vertex.
   */
  connectVertex(source, direction, length, evt, forceClone, ignoreCellAt) {
    // Ignores relative edge labels
    if (source.geometry.relative && this.model.isEdge(source.parent)) {
      return [];
    }

    ignoreCellAt = ignoreCellAt ? ignoreCellAt : false;

    var pt =
      source.geometry.relative && source.parent.geometry != null
        ? new mxPoint(
            source.parent.geometry.width * source.geometry.x,
            source.parent.geometry.height * source.geometry.y
          )
        : new mxPoint(source.geometry.x, source.geometry.y);

    if (direction == mxConstants.DIRECTION_NORTH) {
      pt.x += source.geometry.width / 2;
      pt.y -= length;
    } else if (direction == mxConstants.DIRECTION_SOUTH) {
      pt.x += source.geometry.width / 2;
      pt.y += source.geometry.height + length;
    } else if (direction == mxConstants.DIRECTION_WEST) {
      pt.x -= length;
      pt.y += source.geometry.height / 2;
    } else {
      pt.x += source.geometry.width + length;
      pt.y += source.geometry.height / 2;
    }

    var parentState = this.view.getState(this.model.getParent(source));
    var s = this.view.scale;
    var t = this.view.translate;
    var dx = t.x * s;
    var dy = t.y * s;

    if (parentState != null && this.model.isVertex(parentState.cell)) {
      dx = parentState.x;
      dy = parentState.y;
    }

    // Workaround for relative child cells
    if (this.model.isVertex(source.parent) && source.geometry.relative) {
      pt.x += source.parent.geometry.x;
      pt.y += source.parent.geometry.y;
    }

    // Checks actual end point of edge for target cell
    var target =
      ignoreCellAt || (mxEvent.isControlDown(evt) && !forceClone)
        ? null
        : this.getCellAt(dx + pt.x * s, dy + pt.y * s);

    if (this.model.isAncestor(target, source)) {
      target = null;
    }

    // Checks if target or ancestor is locked
    var temp = target;

    while (temp != null) {
      if (this.isCellLocked(temp)) {
        target = null;
        break;
      }

      temp = this.model.getParent(temp);
    }

    // Checks if source and target intersect
    if (target != null) {
      var sourceState = this.view.getState(source);
      var targetState = this.view.getState(target);

      if (
        sourceState != null &&
        targetState != null &&
        mxUtils.intersects(sourceState, targetState)
      ) {
        target = null;
      }
    }

    var duplicate = !mxEvent.isShiftDown(evt) || forceClone;

    if (duplicate) {
      if (direction == mxConstants.DIRECTION_NORTH) {
        pt.y -= source.geometry.height / 2;
      } else if (direction == mxConstants.DIRECTION_SOUTH) {
        pt.y += source.geometry.height / 2;
      } else if (direction == mxConstants.DIRECTION_WEST) {
        pt.x -= source.geometry.width / 2;
      } else {
        pt.x += source.geometry.width / 2;
      }
    }

    // Uses connectable parent vertex if one exists
    if (target != null && !this.isCellConnectable(target)) {
      var parent = this.getModel().getParent(target);

      if (this.getModel().isVertex(parent) && this.isCellConnectable(parent)) {
        target = parent;
      }
    }

    if (
      target == source ||
      this.model.isEdge(target) ||
      !this.isCellConnectable(target)
    ) {
      target = null;
    }

    var result: any[] = [];

    this.model.beginUpdate();
    try {
      var swimlane = target != null && this.isSwimlane(target);
      var realTarget = !swimlane ? target : null;

      if (realTarget == null && duplicate) {
        // Handles relative children
        var cellToClone = source;
        var geo = this.getCellGeometry(source);

        while (geo != null && geo.relative) {
          cellToClone = this.getModel().getParent(cellToClone);
          geo = this.getCellGeometry(cellToClone);
        }

        // Handle consistuents for cloning
        cellToClone = this.getCompositeParent(cellToClone);
        realTarget = this.duplicateCells([cellToClone], false)[0];

        var geo = this.getCellGeometry(realTarget);

        if (geo != null) {
          geo.x = pt.x - geo.width / 2;
          geo.y = pt.y - geo.height / 2;
        }

        if (swimlane) {
          this.addCells([realTarget], target, null, null, null, true);
          target = null;
        }
      }

      // Never connects children in stack layouts
      var layout: any;

      if (this.layoutManager != null) {
        layout = this.layoutManager.getLayout(this.model.getParent(source));
      }

      var edge =
        (mxEvent.isControlDown(evt) && duplicate) ||
        (target == null &&
          layout != null &&
          layout.constructor == mxStackLayout)
          ? null
          : this.insertEdge(
              this.model.getParent(source),
              null,
              "",
              source,
              realTarget,
              this.createCurrentEdgeStyle()
            );

      // Inserts edge before source
      if (edge != null && this.connectionHandler.insertBeforeSource) {
        var index: any;
        var tmp = source;

        while (
          tmp.parent != null &&
          tmp.geometry != null &&
          tmp.geometry.relative &&
          tmp.parent != edge.parent
        ) {
          tmp = this.model.getParent(tmp);
        }

        if (tmp != null && tmp.parent != null && tmp.parent == edge.parent) {
          index = tmp.parent.getIndex(tmp);
          this.model.add(tmp.parent, edge, index);
        }
      }

      // Special case: Click on west icon puts clone before cell
      if (
        target == null &&
        realTarget != null &&
        layout != null &&
        source.parent != null &&
        layout.constructor == mxStackLayout &&
        direction == mxConstants.DIRECTION_WEST
      ) {
        var index = source.parent.getIndex(source);
        this.model.add(source.parent, realTarget, index);
      }

      if (edge != null) {
        result.push(edge);
      }

      if (target == null && realTarget != null) {
        result.push(realTarget);
      }

      if (realTarget == null && edge != null) {
        edge.geometry.setTerminalPoint(pt, false);
      }

      if (edge != null) {
        this.fireEvent(new mxEventObject("cellsInserted", "cells", [edge]));
      }
    } finally {
      this.model.endUpdate();
    }

    return result;
  }

  fireEvent(_event) {
    // this.fireEvent(new mxEventObject('gridSizeChanged'));
  }
}
