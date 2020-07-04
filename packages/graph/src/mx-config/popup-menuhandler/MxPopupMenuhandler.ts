import { Class } from "../Class";

export const MxPopupMenuhandler = Class.extend({
  // Returns last selected ancestor
  getCellForPopupEvent: function (me) {
    var cell = me.getCell();
    var model = this.graph.getModel();
    var parent = model.getParent(cell);

    while (model.isVertex(parent) && !this.graph.isContainer(parent)) {
      if (this.graph.isCellSelected(parent)) {
        cell = parent;
      }
      parent = model.getParent(parent);
    }

    return cell;
  },
});
