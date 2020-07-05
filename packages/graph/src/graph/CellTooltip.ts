import { Graph } from ".";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxClient } = mx;

export class CellTooltip {
  graph: Graph;

  /**
   * Defines the built-in properties to be ignored in tooltips.
   */
  builtInProperties = ["label", "tooltip", "placeholders", "placeholder"];

  constructor($graph: Graph) {
    this.graph = $graph;
  }

  isCustomLink(cell) {
    return this.graph.isCustomLink(cell);
  }

  isEnabled() {
    return this.graph.isEnabled();
  }

  replacePlaceholders(cell, str) {
    return this.graph.replacePlaceholders(cell, str);
  }

  isReplacePlaceholders(cell) {
    return this.graph.isReplacePlaceholders(cell);
  }

  sanitizeHtml(html) {
    return this.graph.sanitizeHtml(html);
  }

  /**
   * Overrides tooltips to show custom tooltip or metadata.
   */
  getTooltipForCell(cell) {
    var tip = "";

    if (mxUtils.isNode(cell.value, null, null, null)) {
      var tmp = cell.value.getAttribute("tooltip");

      if (tmp != null) {
        if (tmp != null && this.isReplacePlaceholders(cell)) {
          tmp = this.replacePlaceholders(cell, tmp);
        }

        tip = this.sanitizeHtml(tmp);
      } else {
        var ignored = this.builtInProperties;
        var attrs = cell.value.attributes;
        var temp: any[] = [];

        // Hides links in edit mode
        if (this.isEnabled()) {
          ignored.push("link");
        }

        for (var i = 0; i < attrs.length; i++) {
          if (
            mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 &&
            attrs[i].nodeValue.length > 0
          ) {
            temp.push({ name: attrs[i].nodeName, value: attrs[i].nodeValue });
          }
        }

        // Sorts by name
        temp.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });

        for (var i = 0; i < temp.length; i++) {
          if (temp[i].name != "link" || !this.isCustomLink(temp[i].value)) {
            tip +=
              (temp[i].name != "link" ? "<b>" + temp[i].name + ":</b> " : "") +
              mxUtils.htmlEntities(temp[i].value) +
              "\n";
          }
        }

        if (tip.length > 0) {
          tip = tip.substring(0, tip.length - 1);

          if (mxClient.IS_SVG) {
            tip = '<div style="max-width:360px;">' + tip + "</div>";
          }
        }
      }
    }

    return tip;
  }
}
