import { Graph } from "../Graph";

export class GraphTableManager {
  graph: Graph;
  createVertex: any; // (x, a, x,x,x,x,) =>

  getModel() {
    return this.graph.getModel();
  }

  getCellGeometry(table) {
    return this.graph.getCellGeometry(table);
  }

  getActualStartSize(table) {
    return this.graph.getActualStartSize(table);
  }

  createParent(parent, child, childCount) {
    return this.graph.createParent(parent, child, childCount);
  }

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  // createVertex() {
  //   return this.graph.createVertex()
  // }

  createTable(rowCount, colCount, w, h) {
    w = w != null ? w : 40;
    h = h != null ? h : 30;

    return this.createParent(
      this.createVertex(
        null,
        null,
        "",
        0,
        0,
        colCount * w,
        rowCount * h,
        "html=1;whiteSpace=wrap;container=1;collapsible=0;childLayout=tableLayout;"
      ),
      this.createParent(
        this.createVertex(
          null,
          null,
          "",
          0,
          0,
          colCount * w,
          h,
          "html=1;whiteSpace=wrap;container=1;collapsible=0;points=[[0,0.5],[1,0.5]];part=1;"
        ),
        this.createVertex(
          null,
          null,
          "",
          0,
          0,
          w,
          h,
          "html=1;whiteSpace=wrap;connectable=0;part=1;"
        ),
        colCount
      ),
      rowCount
    );
  }

  /**
   * Updates column width and row height.
   */
  tableResized(table) {
    console.log("tableLayout.tableResized", table);
    var model = this.getModel();
    var rowCount = model.getChildCount(table);
    var tableGeo = this.getCellGeometry(table);

    if (tableGeo != null && rowCount > 0) {
      var off = this.getActualStartSize(table);
      var y = off.y;

      for (var i = 0; i < rowCount; i++) {
        var row = model.getChildAt(table, i);

        if (row != null && model.isVertex(row)) {
          var rowGeo = this.getCellGeometry(row);

          if (rowGeo != null) {
            if (i == rowCount - 1) {
              var newRowGeo = rowGeo.clone();
              newRowGeo.width = tableGeo.width - off.x;

              if (y < tableGeo.height) {
                newRowGeo.height = tableGeo.height - y;
              } else if (y > tableGeo.height) {
                tableGeo.height = y + Graph.minTableRowHeight;
                newRowGeo.height = Graph.minTableRowHeight;
              }

              model.setGeometry(row, newRowGeo);
              this.tableRowResized(row, newRowGeo, rowGeo);
            }

            y += rowGeo.height;
          }
        }
      }
    }
  }

  /**
   * Updates column width and row height.
   */
  setRowHeight(row, height) {
    var model = this.getModel();

    model.beginUpdate();
    try {
      for (var i = 0; i < model.getChildCount(row); i++) {
        var child = model.getChildAt(row, i);

        if (model.isVertex(child)) {
          var childGeo = this.getCellGeometry(child);

          if (childGeo != null) {
            childGeo = childGeo.clone();
            childGeo.height = height;
            model.setGeometry(child, childGeo);
          }
        }
      }
    } finally {
      model.endUpdate();
    }
  }

  /**
   * Updates column width and row height.
   */
  tableRowResized(row, bounds, prev) {
    console.log("tableLayout.tableRowResized", row);
    var model = this.getModel();
    var rowGeo = this.getCellGeometry(row);
    var cellCount = model.getChildCount(row);

    if (rowGeo != null && cellCount > 0) {
      var off = this.getActualStartSize(row);
      var x = off.x;

      for (var i = 0; i < cellCount; i++) {
        var cell = model.getChildAt(row, i);

        if (cell != null && model.isVertex(cell)) {
          var geo = this.getCellGeometry(cell);

          if (geo != null) {
            var newGeo = geo.clone();
            newGeo.height = rowGeo.height - off.y;
            model.setGeometry(cell, newGeo);

            if (i == cellCount - 1) {
              if (x < rowGeo.width) {
                newGeo.width = rowGeo.width - x;
              } else if (x > rowGeo.width) {
                rowGeo.width = x + Graph.minTableColumnWidth;
                newGeo.width = Graph.minTableColumnWidth;
              }

              this.tableCellResized(cell, newGeo, geo);
            }

            x += geo.width;
          }
        }
      }
    }

    // Updates previous row height if upper edge was moved
    var table = model.getParent(row);
    var index = table.getIndex(row);

    if (bounds.y != prev.y && index > 0) {
      var previousRow = model.getChildAt(table, index - 1);
      var prg = this.getCellGeometry(previousRow);

      if (prg != null) {
        prg = prg.clone();
        prg.height -= prev.y - bounds.y;
        model.setGeometry(previousRow, prg);
      }
    }
  }

  /**
   * Updates column width and row height.
   */
  tableCellResized(cell, bounds, prev) {
    console.log("tableLayout.tableCellResized", cell, bounds, prev);
    var geo = this.getCellGeometry(cell);

    if (geo != null) {
      var model = this.getModel();
      var row = model.getParent(cell);
      var table = model.getParent(row);
      var index = row.getIndex(cell);

      // Applies new height to all cells in the row
      if (bounds.height != prev.height) {
        this.setRowHeight(row, geo.height);
      }

      // Updates column width
      var previousRow = null;

      for (var i = 0; i < model.getChildCount(table); i++) {
        var currentRow = model.getChildAt(table, i);

        if (model.isVertex(currentRow)) {
          var child = model.getChildAt(currentRow, index);

          if (cell != child) {
            var childGeo = this.getCellGeometry(child);

            if (childGeo != null) {
              childGeo = childGeo.clone();
              childGeo.width = geo.width;
              model.setGeometry(child, childGeo);
            }
          }

          // Updates previous row height
          if (bounds.y != prev.y && currentRow == row && previousRow != null) {
            var prg = this.getCellGeometry(previousRow);

            if (prg != null) {
              this.setRowHeight(previousRow, prg.height - prev.y + bounds.y);
            }
          }

          previousRow = currentRow;
        }
      }

      // Updates previous column width
      if (bounds.x != prev.x && index > 0) {
        var child = model.getChildAt(row, index - 1);
        var childGeo = this.getCellGeometry(child);

        if (childGeo != null) {
          var newChildGeo = childGeo.clone();
          newChildGeo.width -= prev.x - bounds.x;
          model.setGeometry(child, newChildGeo);

          this.tableCellResized(child, newChildGeo, childGeo);
        }
      }
    }
  }
}
