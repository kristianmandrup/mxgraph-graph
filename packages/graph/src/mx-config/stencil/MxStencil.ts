// /**
//  * Adds support for placeholders in text elements of shapes.
//  */
// setEvaluateTextAttribute() {
//   var mxStencilEvaluateTextAttribute =
//     mxStencil.prototype.evaluateTextAttribute;

//   mxStencil.prototype.evaluateTextAttribute = (node, attribute, shape) => {
//     var result = mxStencilEvaluateTextAttribute.apply(this, [
//       node,
//       attribute,
//       shape,
//     ]);
//     var placeholders = node.getAttribute("placeholders");

//     if (placeholders == "1" && shape.state != null) {
//       result = shape.state.view.graph.replacePlaceholders(
//         shape.state.cell,
//         result
//       );
//     }

//     return result;
//   };
// }
