import mx from "@mxgraph-app/mx";
import { Graph } from "./Graph";
import { GraphLayoutManager } from "./GraphLayoutManager";
const { mxEvent, mxPoint, mxCellRenderer, mxGraph } = mx;

export class GraphContainerInitializer {
  graph: any;
  graphLayoutManager: any;
  cellRenderer: any;

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
   * Installs child layout styles.
   */
  init(container) {
    mxGraph.prototype.init.apply(this, [container]);

    // Intercepts links with no target attribute and opens in new window
    this.cellRenderer.initializeLabel = (state, shape) => {
      mxCellRenderer.prototype.initializeLabel.apply(this, [state, shape]);

      // Checks tolerance for clicks on links
      var tol = state.view.graph.tolerance;
      var handleClick = true;
      var first: any;

      var down = (evt) => {
        handleClick = true;
        first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
      };

      var move = (evt) => {
        handleClick =
          handleClick &&
          first != null &&
          Math.abs(first.x - mxEvent.getClientX(evt)) < tol &&
          Math.abs(first.y - mxEvent.getClientY(evt)) < tol;
      };

      var up = (evt) => {
        if (handleClick) {
          var elt = mxEvent.getSource(evt);

          while (elt != null && elt != shape.node) {
            if (elt.nodeName.toLowerCase() == "a") {
              state.view.graph.labelLinkClicked(state, elt, evt);
              break;
            }

            elt = elt.parentNode;
          }
        }
      };

      mxEvent.addGestureListeners(shape.node, down, move, up);
      mxEvent.addListener(shape.node, "click", function (evt) {
        mxEvent.consume(evt);
      });
    };

    this.graphLayoutManager = new GraphLayoutManager(this.graph);
    this.initLayoutManager();
  }

  /**
   * Installs automatic layout via styles
   */
  initLayoutManager() {
    this.graphLayoutManager.initLayoutManager();
  }
}
