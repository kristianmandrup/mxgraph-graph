import { Graph } from "../Graph";
import mx from "@mxgraph-app/mx";
const { mxGraph } = mx;

export class PlaceholderManager {
  graph: Graph;

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  get model() {
    return this.graph.model;
  }

  get view() {
    return this.graph.view;
  }

  getGlobalVariable(name) {
    return this.graph.getGlobalVariable(name);
  }

  /**
   * Specifies the regular expression for matching placeholders.
   */
  placeholderPattern = new RegExp("%(date{.*}|[^%^{^}]+)%", "g");

  /**
   * Adds support for placeholders in labels.
   */
  getLabel(cell) {
    var result = mxGraph.prototype.getLabel.apply(this, [cell]);

    if (
      result != null &&
      this.isReplacePlaceholders(cell) &&
      cell.getAttribute("placeholder") == null
    ) {
      result = this.replacePlaceholders(cell, result);
    }

    return result;
  }

  /**
   * Private helper method.
   */
  replacePlaceholders(cell, str) {
    var result: any[] = [];

    if (str != null) {
      var last = 0;
      var match: any;
      while ((match = this.placeholderPattern.exec(str))) {
        var val = match[0];

        if (val.length > 2 && val != "%label%" && val != "%tooltip%") {
          var tmp = null;

          if (match.index > last && str.charAt(match.index - 1) == "%") {
            tmp = val.substring(1);
          } else {
            var name = val.substring(1, val.length - 1);

            // Workaround for invalid char for getting attribute in older versions of IE
            if (name.indexOf("{") < 0) {
              var current = cell;

              while (tmp == null && current != null) {
                if (current.value != null && typeof current.value == "object") {
                  tmp = current.hasAttribute(name)
                    ? current.getAttribute(name) != null
                      ? current.getAttribute(name)
                      : ""
                    : null;
                }

                current = this.model.getParent(current);
              }
            }

            if (tmp == null) {
              tmp = this.getGlobalVariable(name);
            }
          }

          result.push(
            str.substring(last, match.index) + (tmp != null ? tmp : val)
          );
          last = match.index + val.length;
        }
      }

      result.push(str.substring(last));
    }

    return result.join("");
  }

  /**
   * Revalidates all cells with placeholders in the current graph model.
   */
  updatePlaceholders() {
    // var model = this.model;
    var validate = false;

    for (var key in this.model.cells) {
      var cell = this.model.cells[key];

      if (this.isReplacePlaceholders(cell)) {
        this.view.invalidate(cell, false, false);
        validate = true;
      }
    }

    if (validate) {
      this.view.validate();
    }
  }

  /**
   * Adds support for placeholders in labels.
   */
  isReplacePlaceholders(cell) {
    return (
      cell.value != null &&
      typeof cell.value == "object" &&
      cell.value.getAttribute("placeholders") == "1"
    );
  }
}
