import mx from "@mxgraph-app/mx";
import { TableRowLayout, TableLayout } from "../table";
import { Graph } from ".";

const {
  mxFastOrganicLayout,
  mxCircleLayout,
  mxHierarchicalLayout,
  mxCompactTreeLayout,
  mxStackLayout,
  mxLayoutManager,
  mxConstants,
  mxEvent,
  mxUtils,
} = mx;

export class GraphLayoutManager {
  graph: any;
  layoutManager: any;

  constructor($graph: Graph) {
    this.graph = $graph.graph;
    this.layoutManager = $graph.layoutManager;
  }

  /**
   * Installs automatic layout via styles
   */
  initLayoutManager() {
    this.layoutManager = new mxLayoutManager(this);

    // Using shared instances for table layouts
    var rowLayout = new TableRowLayout(this);
    var tableLayout = new TableLayout(this);

    this.layoutManager.getLayout = (cell, eventName) => {
      // Workaround for possible invalid style after change and before view validation
      if (eventName != mxEvent.BEGIN_UPDATE) {
        var style = this.graph.getCellStyle(cell);

        if (style != null) {
          if (style["childLayout"] == "stackLayout") {
            var stackLayout = new mxStackLayout(this.graph, true);
            stackLayout.resizeParentMax =
              mxUtils.getValue(style, "resizeParentMax", "1") == "1";
            stackLayout.horizontal =
              mxUtils.getValue(style, "horizontalStack", "1") == "1";
            stackLayout.resizeParent =
              mxUtils.getValue(style, "resizeParent", "1") == "1";
            stackLayout.resizeLast =
              mxUtils.getValue(style, "resizeLast", "0") == "1";
            stackLayout.spacing = style["stackSpacing"] || stackLayout.spacing;
            stackLayout.border = style["stackBorder"] || stackLayout.border;
            stackLayout.marginLeft = style["marginLeft"] || 0;
            stackLayout.marginRight = style["marginRight"] || 0;
            stackLayout.marginTop = style["marginTop"] || 0;
            stackLayout.marginBottom = style["marginBottom"] || 0;
            stackLayout.fill = true;

            return stackLayout;
          } else if (style["childLayout"] == "treeLayout") {
            var treeLayout = new mxCompactTreeLayout(this.graph);
            treeLayout.horizontal =
              mxUtils.getValue(style, "horizontalTree", "1") == "1";
            treeLayout.resizeParent =
              mxUtils.getValue(style, "resizeParent", "1") == "1";
            treeLayout.groupPadding = mxUtils.getValue(
              style,
              "parentPadding",
              20
            );
            treeLayout.levelDistance = mxUtils.getValue(
              style,
              "treeLevelDistance",
              30
            );
            treeLayout.maintainParentLocation = true;
            treeLayout.edgeRouting = false;
            treeLayout.resetEdges = false;

            return treeLayout;
          } else if (style["childLayout"] == "flowLayout") {
            var flowLayout = new mxHierarchicalLayout(
              this.graph,
              mxUtils.getValue(
                style,
                "flowOrientation",
                mxConstants.DIRECTION_EAST
              )
            );
            flowLayout.resizeParent =
              mxUtils.getValue(style, "resizeParent", "1") == "1";
            flowLayout.parentBorder = mxUtils.getValue(
              style,
              "parentPadding",
              20
            );
            flowLayout.maintainParentLocation = true;

            // Special undocumented styles for changing the hierarchical
            flowLayout.intraCellSpacing = mxUtils.getValue(
              style,
              "intraCellSpacing",
              mxHierarchicalLayout.prototype.intraCellSpacing
            );
            flowLayout.interRankCellSpacing = mxUtils.getValue(
              style,
              "interRankCellSpacing",
              mxHierarchicalLayout.prototype.interRankCellSpacing
            );
            flowLayout.interHierarchySpacing = mxUtils.getValue(
              style,
              "interHierarchySpacing",
              mxHierarchicalLayout.prototype.interHierarchySpacing
            );
            flowLayout.parallelEdgeSpacing = mxUtils.getValue(
              style,
              "parallelEdgeSpacing",
              mxHierarchicalLayout.prototype.parallelEdgeSpacing
            );

            return flowLayout;
          } else if (style["childLayout"] == "circleLayout") {
            return new mxCircleLayout(this.graph);
          } else if (style["childLayout"] == "organicLayout") {
            return new mxFastOrganicLayout(this.graph);
          } else if (
            this.graph.isTableRow(cell) ||
            this.graph.isTableCell(cell)
          ) {
            return rowLayout;
          } else if (this.graph.isTable(cell)) {
            return tableLayout;
          }
        }
      }

      return null;
    };
  }
}
