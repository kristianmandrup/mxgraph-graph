import mx from "@mxgraph-app/mx";
const { mxCellEditor } = mx;

export class CellEditorConfig {
  configure() {
    this.setIsContentEditing();
    this.setIsTableSelected();

    return mxCellEditor;
  }

  setIsContentEditing() {
    /**
     * HTML in-place editor
     */
    mxCellEditor.prototype.isContentEditing = () => {
      var state = this.graph.view.getState(this.editingCell);

      return state != null && state.style["html"] == 1;
    };
  }

  setIsTableSelected() {
    /**
     * Returns true if all selected text is inside a table element.
     */
    mxCellEditor.prototype.isTableSelected = () => {
      return (
        this.graph.getParentByName(
          this.graph.getSelectedElement(),
          "TABLE",
          this.textarea
        ) != null
      );
    };
  }

  setAlignText() {
    /**
     * Sets the alignment of the current selected cell. This sets the
     * alignment in the cell style, removes all alignment within the
     * text and invokes the built-in alignment function.
     *
     * Only the built-in function is invoked if shift is pressed or
     * if table cells are selected and shift is not pressed.
     */
    mxCellEditor.prototype.alignText = (align, evt) => {
      var shiftPressed = evt != null && mxEvent.isShiftDown(evt);

      if (
        shiftPressed ||
        (window.getSelection != null &&
          window.getSelection().containsNode != null)
      ) {
        var allSelected = true;

        this.graph.processElements(this.textarea, function (node) {
          if (shiftPressed || window.getSelection().containsNode(node, true)) {
            node.removeAttribute("align");
            node.style.textAlign = null;
          } else {
            allSelected = false;
          }
        });

        if (allSelected) {
          this.graph.cellEditor.setAlign(align);
        }
      }

      document.execCommand("justify" + align.toLowerCase(), false, null);
    };

    /**
     * Creates the keyboard event handler for the current graph and history.
     */
    mxCellEditor.prototype.saveSelection();
    {
      if (window.getSelection) {
        var sel = window.getSelection();

        if (sel.getRangeAt && sel.rangeCount) {
          var ranges = [];

          for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            ranges.push(sel.getRangeAt(i));
          }

          return ranges;
        }
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }

      return null;
    }

    /**
     * Creates the keyboard event handler for the current graph and history.
     */
    mxCellEditor.prototype.restoreSelection(savedSel);
    {
      try {
        if (savedSel) {
          if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();

            for (var i = 0, len = savedSel.length; i < len; ++i) {
              sel.addRange(savedSel[i]);
            }
          } else if (document.selection && savedSel.select) {
            savedSel.select();
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }
}
