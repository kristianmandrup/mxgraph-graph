import mx from "@mxgraph-app/mx";
const { mxVertexHandler } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxVertexHandler = Class.extend({
  init: function (state) {
    mxVertexHandler.apply(this, [state]);
  },
});
