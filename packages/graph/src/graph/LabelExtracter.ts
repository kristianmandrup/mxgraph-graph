import mx from "@mxgraph-app/mx";
import { Graph } from ".";
import { ValueConverter } from "./ValueConverter";
import { PlaceholderManager } from "./PlaceholderManager";
const { mxUtils } = mx;

export class LabelExtracter {
  graph: Graph;
  valueConverter: ValueConverter;
  placeholderManager: PlaceholderManager;
  isHtmlLabel: any;

  constructor($graph: Graph) {
    this.graph = $graph;
    this.valueConverter = new ValueConverter($graph);
    this.placeholderManager = new PlaceholderManager($graph);
  }

  get model() {
    return this.graph.model;
  }

  // get isHtmlLabel() {
  //   return this.graph.isHtmlLabel;
  // }

  //
  getLabel(cell) {
    return this.placeholderManager.getLabel(cell);
  }

  /**
   * Returns all labels in the diagram as a string.
   */
  getIndexableText() {
    var tmp = document.createElement("div");
    var labels: any[] = [];
    var label = "";

    for (var key in this.model.cells) {
      var cell = this.model.cells[key];

      if (this.model.isVertex(cell) || this.model.isEdge(cell)) {
        if (this.isHtmlLabel(cell)) {
          tmp.innerHTML = this.getLabel(cell);
          label = mxUtils.extractTextWithWhitespace([tmp]);
        } else {
          label = this.getLabel(cell);
        }

        label = mxUtils.trim(label.replace(/[\x00-\x1F\x7F-\x9F]|\s+/g, " "));

        if (label.length > 0) {
          labels.push(label);
        }
      }
    }

    return labels.join(" ");
  }

  /**
   * Returns the label for the given cell.
   */
  convertValueToString(cell) {
    return this.valueConverter.convertValueToString(cell);
  }
}
