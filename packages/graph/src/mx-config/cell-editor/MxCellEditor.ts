import mx from "@mxgraph-app/mx";
const {
  mxRectangle,
  mxEvent,
  mxClient,
  mxCellEditor,
  mxConstants,
  mxUtils,
} = mx;
import { Class } from "./Class";

// See: https://johnresig.com/blog/simple-javascript-inheritance/
/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxCellEditor = Class.extend({
  documentMode: document["documentMode"],

  init: function (graph) {
    mxCellEditor.apply(this, [graph]);
  },

  getMinimumSize: function (state) {
    const { graph } = this;
    var scale = graph.getView().scale;

    return new mxRectangle(
      0,
      0,
      state.text == null ? 30 : state.text.size * scale + 20,
      30
    );
  },

  applyValue: function (state, value) {
    const { graph } = this;
    const mxCellEditorApplyValue = mxCellEditor.prototype.applyValue;
    // Removes empty relative child labels in edges
    graph.getModel().beginUpdate();

    try {
      mxCellEditorApplyValue.apply(this, [state, value]);

      if (
        value == "" &&
        graph.isCellDeletable(state.cell) &&
        graph.model.getChildCount(state.cell) == 0 &&
        graph.isTransparentState(state)
      ) {
        graph.removeCells([state.cell], false);
      }
    } finally {
      graph.getModel().endUpdate();
    }
  },

  /**
   * Returns the background color to be used for the editing box. This returns
   * the label background for edge labels and null for all other cases.
   */
  getBackgroundColor: function (state) {
    var color = mxUtils.getValue(
      state.style,
      mxConstants.STYLE_LABEL_BACKGROUNDCOLOR,
      null
    );

    if (
      (color == null || color == mxConstants.NONE) &&
      state.cell.geometry != null &&
      state.cell.geometry.width > 0 &&
      (mxUtils.getValue(state.style, mxConstants.STYLE_ROTATION, 0) != 0 ||
        mxUtils.getValue(state.style, mxConstants.STYLE_HORIZONTAL, 1) == 0)
    ) {
      color = mxUtils.getValue(state.style, mxConstants.STYLE_FILLCOLOR, null);
    }

    if (color == mxConstants.NONE) {
      color = null;
    }

    return color;
  },
  installListeners: function (element: any) {
    const { documentMode } = this;
    var cellEditorInstallListeners = mxCellEditor.prototype.installListeners;
    cellEditorInstallListeners.apply(this, [element]);
    const { textarea } = this;

    // Adds a reference from the clone to the original node, recursively
    function reference(node, clone) {
      clone.originalNode = node;

      node = node.firstChild;
      var child = clone.firstChild;

      while (node != null && child != null) {
        reference(node, child);
        node = node.nextSibling;
        child = child.nextSibling;
      }

      return clone;
    }

    // Checks the given node for new nodes, recursively
    function checkNode(node, clone) {
      if (node != null) {
        if (clone.originalNode != node) {
          cleanNode(node);
        } else {
          node = node.firstChild;
          clone = clone.firstChild;

          while (node != null) {
            var nextNode = node.nextSibling;

            if (clone == null) {
              cleanNode(node);
            } else {
              checkNode(node, clone);
              clone = clone.nextSibling;
            }

            node = nextNode;
          }
        }
      }
    }

    // Removes unused DOM nodes and attributes, recursively
    function cleanNode(node) {
      var child = node.firstChild;

      while (child != null) {
        var next = child.nextSibling;
        cleanNode(child);
        child = next;
      }

      if (
        (node.nodeType != 1 ||
          (node.nodeName !== "BR" && node.firstChild == null)) &&
        (node.nodeType != 3 ||
          mxUtils.trim(mxUtils.getTextContent(node)).length == 0)
      ) {
        node.parentNode.removeChild(node);
      } else {
        // Removes linefeeds
        if (node.nodeType == 3) {
          mxUtils.setTextContent(
            node,
            mxUtils.getTextContent(node).replace(/\n|\r/g, "")
          );
        }

        // Removes CSS classes and styles (for Word and Excel)
        if (node.nodeType == 1) {
          node.removeAttribute("style");
          node.removeAttribute("class");
          node.removeAttribute("width");
          node.removeAttribute("cellpadding");
          node.removeAttribute("cellspacing");
          node.removeAttribute("border");
        }
      }
    }

    // Handles paste from Word, Excel etc by removing styles, classnames and unused nodes
    // LATER: Fix undo/redo for paste
    if (!mxClient.IS_QUIRKS && documentMode !== 7 && documentMode !== 8) {
      mxEvent.addListener(textarea, "paste", (_evt) => {
        var clone = reference(textarea, textarea.cloneNode(true));

        window.setTimeout(() => {
          // Paste from Word or Excel
          if (
            textarea != null &&
            (textarea.innerHTML.indexOf("<o:OfficeDocumentSettings>") >= 0 ||
              textarea.innerHTML.indexOf("<!--[if !mso]>") >= 0)
          ) {
            checkNode(textarea, clone);
          }
        }, 0);
      });
    }
  },
});
