import mx from "@mxgraph-app/mx";
const { mxStencil } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";

/**
 *
 */
export const MxStencil = Class.extend({
  /**
   * Adds support for placeholders in text elements of shapes.
   */

  evaluateTextAttribute: function (node, attribute, shape) {
    const mxStencilEvaluateTextAttribute =
      mxStencil.prototype.evaluateTextAttribute;

    var result = mxStencilEvaluateTextAttribute.apply(this, [
      node,
      attribute,
      shape,
    ]);
    var placeholders = node.getAttribute("placeholders");

    if (placeholders == "1" && shape.state != null) {
      result = shape.state.view.graph.replacePlaceholders(
        shape.state.cell,
        result
      );
    }

    return result;
  },
});
