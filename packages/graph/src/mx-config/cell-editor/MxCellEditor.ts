import mx from "@mxgraph-app/mx";
const {
  mxRectangle,
  mxEvent,
  mxClient,
  mxCellEditor,
  mxConstants,
  mxUtils,
} = mx;
import { Class } from "../Class";

// See: https://johnresig.com/blog/simple-javascript-inheritance/
/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxCellEditor = Class.extend({
  documentMode: document["documentMode"],

  $$init: function (graph) {
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

  toggleViewMode: function () {
    const {
      editingCell,
      clearOnChange,
      textarea,
      getEmptyLabelText,
      documentMode,
      graph,
      restoreSelection,
      resize,
    } = this;

    var state = this.graph.view.getState(editingCell);

    if (state != null) {
      var nl2Br =
        state != null && mxUtils.getValue(state.style, "nl2Br", "1") != "0";
      var tmp = this.saveSelection();

      var size, content;
      if (!this.codeViewMode) {
        // Clears the initial empty label on the first keystroke
        if (clearOnChange && textarea.innerHTML == getEmptyLabelText()) {
          this.clearOnChange = false;
          textarea.innerHTML = "";
        }

        // Removes newlines from HTML and converts breaks to newlines
        // to match the HTML output in plain text
        content = mxUtils.htmlEntities(textarea.innerHTML);

        // Workaround for trailing line breaks being ignored in the editor
        if (!mxClient.IS_QUIRKS && documentMode != 8) {
          content = mxUtils.replaceTrailingNewlines(content, "<div><br></div>");
        }

        content = graph.sanitizeHtml(
          nl2Br
            ? content.replace(/\n/g, "").replace(/&lt;br\s*.?&gt;/g, "<br>")
            : content,
          true
        );
        textarea.className = "mxCellEditor mxPlainTextEditor";

        size = mxConstants.DEFAULT_FONTSIZE;

        textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT
          ? Math.round(size * mxConstants.LINE_HEIGHT) + "px"
          : mxConstants.LINE_HEIGHT;
        textarea.style.fontSize = Math.round(size) + "px";
        textarea.style.textDecoration = "";
        textarea.style.fontWeight = "normal";
        textarea.style.fontStyle = "";
        textarea.style.fontFamily = mxConstants.DEFAULT_FONTFAMILY;
        textarea.style.textAlign = "left";

        // Adds padding to make cursor visible with borders
        textarea.style.padding = "2px";

        if (textarea.innerHTML != content) {
          textarea.innerHTML = content;
        }

        this.codeViewMode = true;
      } else {
        content = mxUtils.extractTextWithWhitespace(textarea.childNodes);

        // Strips trailing line break
        if (content.length > 0 && content.charAt(content.length - 1) == "\n") {
          content = content.substring(0, content.length - 1);
        }

        content = this.graph.sanitizeHtml(
          nl2Br ? content.replace(/\n/g, "<br/>") : content,
          true
        );
        textarea.className = "mxCellEditor geContentEditable";

        var size = mxUtils.getValue(
          state.style,
          mxConstants.STYLE_FONTSIZE,
          mxConstants.DEFAULT_FONTSIZE
        );
        var family = mxUtils.getValue(
          state.style,
          mxConstants.STYLE_FONTFAMILY,
          mxConstants.DEFAULT_FONTFAMILY
        );
        var align = mxUtils.getValue(
          state.style,
          mxConstants.STYLE_ALIGN,
          mxConstants.ALIGN_LEFT
        );
        var bold =
          (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
            mxConstants.FONT_BOLD) ==
          mxConstants.FONT_BOLD;
        var italic =
          (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
            mxConstants.FONT_ITALIC) ==
          mxConstants.FONT_ITALIC;
        var txtDecor: any[] = [];

        if (
          (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
            mxConstants.FONT_UNDERLINE) ==
          mxConstants.FONT_UNDERLINE
        ) {
          txtDecor.push("underline");
        }

        const FONT_STRIKETHROUGH = mxConstants["FONT_STRIKETHROUGH"];
        if (
          (mxUtils.getValue(state.style, mxConstants.STYLE_FONTSTYLE, 0) &
            FONT_STRIKETHROUGH) ==
          FONT_STRIKETHROUGH
        ) {
          txtDecor.push("line-through");
        }

        textarea.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT
          ? Math.round(size * mxConstants.LINE_HEIGHT) + "px"
          : mxConstants.LINE_HEIGHT;
        textarea.style.fontSize = Math.round(size) + "px";
        textarea.style.textDecoration = txtDecor.join(" ");
        textarea.style.fontWeight = bold ? "bold" : "normal";
        textarea.style.fontStyle = italic ? "italic" : "";
        textarea.style.fontFamily = family;
        textarea.style.textAlign = align;
        textarea.style.padding = "0px";

        if (textarea.innerHTML != content) {
          textarea.innerHTML = content;

          if (textarea.innerHTML.length == 0) {
            textarea.innerHTML = this.getEmptyLabelText();
            this.clearOnChange = textarea.innerHTML.length > 0;
          }
        }

        this.codeViewMode = false;
      }

      textarea.focus();

      if (this.switchSelectionState != null) {
        restoreSelection(this.switchSelectionState);
      }

      this.switchSelectionState = tmp;
      resize();
    }
  },

  resize: function (state, _trigger) {
    var mxCellEditorResize = mxCellEditor.prototype.resize;
    const { textarea, codeViewMode, bounds } = this;
    if (textarea != null) {
      var state = this.graph.getView().getState(this.editingCell);

      if (codeViewMode && state != null) {
        var scale = state.view.scale;
        this.bounds = mxRectangle.fromRectangle(state);

        // General placement of code editor if cell has no size
        // LATER: Fix HTML editor bounds for edge labels
        if (this.bounds.width == 0 && this.bounds.height == 0) {
          bounds.width = 160 * scale;
          bounds.height = 60 * scale;

          var m = state.text != null ? state.text.margin : null;

          if (m == null) {
            m = mxUtils.getAlignmentAsPoint(
              mxUtils.getValue(
                state.style,
                mxConstants.STYLE_ALIGN,
                mxConstants.ALIGN_CENTER
              ),
              mxUtils.getValue(
                state.style,
                mxConstants.STYLE_VERTICAL_ALIGN,
                mxConstants.ALIGN_MIDDLE
              )
            );
          }

          bounds.x += m.x * this.bounds.width;
          bounds.y += m.y * this.bounds.height;
        }

        textarea.style.width =
          Math.round((this.bounds.width - 4) / scale) + "px";
        textarea.style.height =
          Math.round((this.bounds.height - 4) / scale) + "px";
        textarea.style.overflow = "auto";

        // Adds scrollbar offset if visible
        if (textarea.clientHeight < textarea.offsetHeight) {
          textarea.style.height =
            Math.round(this.bounds.height / scale) +
            (textarea.offsetHeight - textarea.clientHeight) +
            "px";
          this.bounds.height = parseInt(textarea.style.height) * scale;
        }

        if (textarea.clientWidth < textarea.offsetWidth) {
          textarea.style.width =
            Math.round(bounds.width / scale) +
            (textarea.offsetWidth - textarea.clientWidth) +
            "px";
          bounds.width = parseInt(textarea.style.width) * scale;
        }

        textarea.style.left = Math.round(bounds.x) + "px";
        textarea.style.top = Math.round(bounds.y) + "px";

        if (mxClient.IS_VML) {
          textarea.style.zoom = scale;
        } else {
          mxUtils.setPrefixedStyle(
            textarea.style,
            "transform",
            "scale(" + scale + "," + scale + ")"
          );
        }
      } else {
        textarea.style.height = "";
        textarea.style.overflow = "";

        mxCellEditorResize.apply(this);
      }
    }
  },

  getInitialValue: function (state, trigger) {
    var mxCellEditorGetInitialValue = mxCellEditor.prototype.getInitialValue;
    if (mxUtils.getValue(state.style, "html", "0") == "0") {
      return mxCellEditorGetInitialValue.apply(this, [state, trigger]);
    } else {
      var result = this.graph.getEditingValue(state.cell, trigger);

      if (mxUtils.getValue(state.style, "nl2Br", "1") == "1") {
        result = result.replace(/\n/g, "<br/>");
      }

      result = this.graph.sanitizeHtml(result, true);

      return result;
    }
  },

  getCurrentValue: function (state) {
    const { textarea } = this;
    var mxCellEditorGetCurrentValue = mxCellEditor.prototype.getCurrentValue;

    if (mxUtils.getValue(state.style, "html", "0") == "0") {
      return mxCellEditorGetCurrentValue.apply(this, [state]);
    } else {
      var result = this.graph.sanitizeHtml(textarea.innerHTML, true);

      if (mxUtils.getValue(state.style, "nl2Br", "1") == "1") {
        result = result.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>");
      } else {
        result = result.replace(/\r\n/g, "").replace(/\n/g, "");
      }

      return result;
    }
  },

  focusContainer: function () {
    const { graph } = this;
    try {
      graph.container.focus();
    } catch (e) {
      // ignore
    }
  },

  stopEditing: function (cancel) {
    const { codeViewMode, toggleViewMode, focusContainer } = this;
    var mxCellEditorStopEditing = mxCellEditor.prototype.stopEditing;

    // Restores default view mode before applying value
    if (codeViewMode) {
      toggleViewMode();
    }

    mxCellEditorStopEditing.apply(this, [cancel]);

    // Tries to move focus back to container after editing if possible
    focusContainer();
  },

  /**
   * HTML in-place editor
   */
  startEditing: function (cell, arg) {
    mxCellEditor.prototype.escapeCancelsEditing = false;
    var mxCellEditorStartEditing = mxCellEditor.prototype.startEditing;
    const { textarea, graph } = this;
    mxCellEditorStartEditing.apply(this, [cell, arg]);

    // Overrides class in case of HTML content to add
    // dashed borders for divs and table cells
    var state = this.graph.view.getState(cell);

    if (state != null && state.style["html"] == 1) {
      textarea.className = "mxCellEditor geContentEditable";
    } else {
      textarea.className = "mxCellEditor mxPlainTextEditor";
    }

    // Toggles markup vs wysiwyg mode
    this.codeViewMode = false;

    // Stores current selection range when switching between markup and code
    this.switchSelectionState = null;

    // Selects editing cell
    graph.setSelectionCell(cell);

    // Enables focus outline for edges and edge labels
    var parent = graph.getModel().getParent(cell);
    var geo = graph.getCellGeometry(cell);

    if (
      (graph.getModel().isEdge(parent) && geo != null && geo.relative) ||
      graph.getModel().isEdge(cell)
    ) {
      // Quirks does not support outline at all so use border instead
      if (mxClient.IS_QUIRKS) {
        textarea.style.border = "gray dotted 1px";
      }
      // IE>8 and FF on Windows uses outline default of none
      else if (
        mxClient.IS_IE ||
        mxClient.IS_IE11 ||
        (mxClient.IS_FF && mxClient.IS_WIN)
      ) {
        textarea.style.outline = "gray dotted 1px";
      } else {
        textarea.style.outline = "";
      }
    } else if (mxClient.IS_QUIRKS) {
      textarea.style.outline = "none";
      textarea.style.border = "";
    }
  },
});
