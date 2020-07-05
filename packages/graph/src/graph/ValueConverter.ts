import mx from "@mxgraph-app/mx";
import { Graph } from ".";
import { PlaceholderManager } from "./PlaceholderManager";
const { mxGraph } = mx;

export class ValueConverter {
  graph: any;
  placeholderManager: PlaceholderManager;

  constructor($graph: Graph) {
    this.graph = $graph;
    this.placeholderManager = new PlaceholderManager($graph);
  }

  get view() {
    return this.graph.view;
  }

  get model() {
    return this.graph.model;
  }

  isReplacePlaceholders(cell) {
    return this.placeholderManager.isReplacePlaceholders(cell);
  }

  /**
   * Returns the label for the given cell.
   */
  convertValueToString(cell) {
    var value = this.model.getValue(cell);

    if (value != null && typeof value == "object") {
      if (
        this.isReplacePlaceholders(cell) &&
        cell.getAttribute("placeholder") != null
      ) {
        var name = cell.getAttribute("placeholder");
        var current = cell;
        var result = null;

        while (result == null && current != null) {
          if (current.value != null && typeof current.value == "object") {
            result = current.hasAttribute(name)
              ? current.getAttribute(name) != null
                ? current.getAttribute(name)
                : ""
              : null;
          }

          current = this.model.getParent(current);
        }

        return result || "";
      } else {
        return value.getAttribute("label") || "";
      }
    }

    return mxGraph.prototype.convertValueToString.apply(this, [cell]);
  }
}
