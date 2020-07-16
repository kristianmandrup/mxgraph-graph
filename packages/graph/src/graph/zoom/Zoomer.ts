import mx from "@mxgraph-app/mx";
import { Graph } from "../Graph";
const { mxGraph } = mx;

export class Zoomer {
  graph: any;
  zoomFactor: number = 1;

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  get view() {
    return this.graph.view;
  }

  get model() {
    return this.graph.model;
  }

  /**
   * Overridden to limit zoom to 1% - 16.000%.
   */
  zoom(factor, center?) {
    factor =
      Math.max(0.01, Math.min(this.view.scale * factor, 160)) / this.view.scale;
    mxGraph.prototype.zoom.apply(this, [factor, center]);
  }

  /**
   * Function: zoomIn
   *
   * Zooms into the graph by <zoomFactor>.
   */
  zoomIn() {
    // Switches to 1% zoom steps below 15%
    if (this.view.scale < 0.15) {
      this.zoom((this.view.scale + 0.01) / this.view.scale);
    } else {
      // Uses to 5% zoom steps for better grid rendering in webkit
      // and to avoid rounding errors for zoom steps
      this.zoom(
        Math.round(this.view.scale * this.zoomFactor * 20) /
          20 /
          this.view.scale
      );
    }
  }

  /**
   * Function: zoomOut
   *
   * Zooms out of the graph by <zoomFactor>.
   */
  zoomOut() {
    // Switches to 1% zoom steps below 15%
    if (this.view.scale <= 0.15) {
      this.zoom((this.view.scale - 0.01) / this.view.scale, null);
    } else {
      // Uses to 5% zoom steps for better grid rendering in webkit
      // and to avoid rounding errors for zoom steps
      this.zoom(
        Math.round(this.view.scale * (1 / this.zoomFactor) * 20) /
          20 /
          this.view.scale,
        null
      );
    }
  }
}
