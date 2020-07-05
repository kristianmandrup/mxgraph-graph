import { Graph } from "./Graph";
import mx from "@mxgraph-app/mx";
const { mxPoint, mxRectangle } = mx;

export class Page {
  pageVisible?: boolean;
  pageFormat: any;
  pageScale: any;
  view: any;

  scrollTileSize: any;

  graph: Graph;

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  getGraphBounds(): any {
    return {}; // this.graph.getGraphBounds;
  }

  /**
   *
   */
  defaultPageBackgroundColor = "#ffffff";

  /**
   *
   */
  defaultPageBorderColor = "#ffffff";

  /**
   * Specifies if the page should be visible for new files. Default is true.
   */
  defaultPageVisible = true;

  /**
   * Hook for subclassers.
   */
  getPagePadding() {
    return new mxPoint(0, 0);
  }

  /**
   * Returns the size of the page format scaled with the page size.
   */
  getPageSize() {
    return this.pageVisible
      ? new mxRectangle(
          0,
          0,
          this.pageFormat.width * this.pageScale,
          this.pageFormat.height * this.pageScale
        )
      : this.scrollTileSize;
  }

  /**
   * Returns a rectangle describing the position and count of the
   * background pages, where x and y are the position of the top,
   * left page and width and height are the vertical and horizontal
   * page count.
   */
  getPageLayout() {
    var size = this.getPageSize();
    var bounds = this.getGraphBounds();

    if (bounds.width == 0 || bounds.height == 0) {
      return new mxRectangle(0, 0, 1, 1);
    } else {
      var x0 = Math.floor(
        Math.ceil(bounds.x / this.view.scale - this.view.translate.x) /
          size.width
      );
      var y0 = Math.floor(
        Math.ceil(bounds.y / this.view.scale - this.view.translate.y) /
          size.height
      );
      var w0 =
        Math.ceil(
          (Math.floor((bounds.x + bounds.width) / this.view.scale) -
            this.view.translate.x) /
            size.width
        ) - x0;
      var h0 =
        Math.ceil(
          (Math.floor((bounds.y + bounds.height) / this.view.scale) -
            this.view.translate.y) /
            size.height
        ) - y0;

      return new mxRectangle(x0, y0, w0, h0);
    }
  }
}
