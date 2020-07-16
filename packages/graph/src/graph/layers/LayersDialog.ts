import { Graph } from "..";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxResources, mxEvent } = mx;

export class LayersDialog {
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

  get getModel() {
    return this.graph.getModel();
  }

  convertValueToString(layer) {
    return this.graph.convertValueToString(layer);
  }

  /**
   *
   */
  create() {
    var div = document.createElement("div");
    div.style.position = "absolute";

    var model = this.getModel();
    var childCount = model.getChildCount(model.root);

    for (var i = 0; i < childCount; i++) {
      ((layer) => {
        var span = document.createElement("div");
        span.style.overflow = "hidden";
        span.style.textOverflow = "ellipsis";
        span.style.padding = "2px";
        span.style.whiteSpace = "nowrap";

        var cb = document.createElement("input");
        cb.style.display = "inline-block";
        cb.setAttribute("type", "checkbox");

        if (model.isVisible(layer)) {
          cb.setAttribute("checked", "checked");
          cb.defaultChecked = true;
        }

        span.appendChild(cb);

        var title =
          this.convertValueToString(layer) ||
          mxResources.get("background") ||
          "Background";
        span.setAttribute("title", title);
        mxUtils.write(span, title);
        div.appendChild(span);

        mxEvent.addListener(cb, "click", function () {
          if (cb.getAttribute("checked") != null) {
            cb.removeAttribute("checked");
          } else {
            cb.setAttribute("checked", "checked");
          }

          model.setVisible(layer, cb.checked);
        });
      })(model.getChildAt(model.root, i));
    }

    return div;
  }
}
