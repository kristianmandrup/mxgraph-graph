import mx from "@mxgraph-app/mx";
const { mxOutline } = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";
import { HoverIcons } from "../../hover/HoverIcons";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxOutline = Class.extend({
  init: function (source, container) {
    mxOutline.apply(this, [source, container]);
  },
  sizerImage: HoverIcons.prototype["mainHandle"],
});
