import mx from "@mxgraph-app/mx";
const { mxRubberband } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";
import { HoverIcons } from "../../hover/HoverIcons";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxRubberband = Class.extend({
  init: function (graph) {
    mxRubberband.apply(this, [graph]);
  },
  sizerImage: HoverIcons.prototype["mainHandle"],
});
