import { Graph } from "./Graph";

export class TableChecker {
  graph: Graph;

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  getCellStyle(cell) {
    return this.graph.getCellStyle(cell);
  }

  get model() {
    return this.graph.model;
  }

  /**
   * Returns true if the given cell is a table cell.
   */
  isTableCell(cell) {
    return this.isTableRow(this.model.getParent(cell));
  }

  /**
   * Returns true if the given cell is a table row.
   */
  isTableRow(cell) {
    return this.isTable(this.model.getParent(cell));
  }

  /**
   * Returns true if the given cell is a table.
   */
  isTable(cell) {
    var style = this.getCellStyle(cell);

    return style != null && style["childLayout"] == "tableLayout";
  }
}
