import mx from "@mxgraph-app/mx";
const { mxEvent, mxPopupMenu } = mx;
import { Class } from "../Class";

export const MxPopupMenuhandler = Class.extend({
  /**
   * Consumes click events for disabled menu items.
   */

  addItem: function (title, image, funct, parent, iconCls, enabled) {
    var mxPopupMenuAddItem = mxPopupMenu.prototype.addItem;
    var result = mxPopupMenuAddItem.apply(this, [
      title,
      image,
      funct,
      parent,
      iconCls,
      enabled,
    ]);
    if (enabled != null && !enabled) {
      mxEvent.addListener(result, "mousedown", (evt) => {
        mxEvent.consume(evt);
      });
    }
    return result;
  },
});
