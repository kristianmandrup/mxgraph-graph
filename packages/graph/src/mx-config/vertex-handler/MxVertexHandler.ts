import mx from "@mxgraph-app/mx";
const {
  mxResources,
  mxRectangle,
  mxGraphHandler,
  mxConstants,
  mxStencilRegistry,
  mxCellRenderer,
  mxUtils,
  mxEvent,
  mxPoint,
  mxVertexHandler,
} = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
// http://dean.edwards.name/base/Base.js
import Base from "../Base";
import { HoverIcons } from "../../hover/HoverIcons";
import { formatHintText } from "../helpers";

const createHint = () => {};
const hintOffset = 10; // Editor.hintOffset
const hoverProto: any = HoverIcons.prototype;
const clearImage: any = "clear.png"; // Dialog.prototype.clearImage
const editImage: any = "edit.png"; // Editor.editImage
const moveImage: any = "move.png"; // Editor.moveImage
const { rotationHandle } = hoverProto;
/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */

// ...mxVertexHandler.prototype,

export const MxVertexHandler = Base.extend([mxVertexHandler], {
  // $$init: function (state) {
  //   mxVertexHandler.apply(this, [state]);
  // },
  // constructor: function () {
  //   this.extend(arguments[0]);
  // },
  // ancestor: mxVertexHandler,

  /**
   * Moves rotation handle to top, right corner.
   */
  rotationHandleVSpacing: -12,

  getRotationHandlePosition: function () {
    const padding = this.getHandlePadding();
    const { bounds, rotationHandleVSpacing } = this;

    return new mxPoint(
      bounds.x + bounds.width - rotationHandleVSpacing + padding.x / 2,
      bounds.y + rotationHandleVSpacing - padding.y / 2
    );
  },

  /**
   * Enables recursive resize for groups.
   */
  isRecursiveResize: function (state, me) {
    const { graph } = this;
    return (
      graph.isRecursiveVertexResize(state) &&
      !mxEvent.isControlDown(me.getEvent())
    );
  },

  /**
   * Enables centered resize events.
   */
  isCenteredEvent: function (state, me) {
    const { graph } = this;
    return (
      (!(
        !graph.isSwimlane(state.cell) &&
        graph.model.getChildCount(state.cell) > 0 &&
        !graph.isCellCollapsed(state.cell) &&
        mxUtils.getValue(state.style, "recursiveResize", "1") == "1" &&
        mxUtils.getValue(state.style, "childLayout", null) == null
      ) &&
        mxEvent.isControlDown(me.getEvent())) ||
      mxEvent.isMetaDown(me.getEvent())
    );
  },

  /**
   * Adds handle padding for editing cells and exceptions.
   */
  getHandlePadding: function () {
    var vertexHandlerGetHandlePadding =
      mxVertexHandler.prototype.getHandlePadding;

    var result = new mxPoint(0, 0);
    var tol = this.tolerance;
    var name = this.state.style["shape"];

    if (
      mxCellRenderer.defaultShapes[name] == null &&
      mxStencilRegistry.getStencil(name) == null
    ) {
      name = mxConstants.SHAPE_RECTANGLE;
    }

    // Checks if custom handles are overlapping with the shape border
    var handlePadding =
      this.graph.cellEditor.getEditingCell() == this.state.cell;

    if (!handlePadding) {
      if (this.customHandles != null) {
        for (var i = 0; i < this.customHandles.length; i++) {
          if (
            this.customHandles[i].shape != null &&
            this.customHandles[i].shape.bounds != null
          ) {
            var b = this.customHandles[i].shape.bounds;
            var px = b.getCenterX();
            var py = b.getCenterY();

            if (
              Math.abs(this.state.x - px) < b.width / 2 ||
              Math.abs(this.state.y - py) < b.height / 2 ||
              Math.abs(this.state.x + this.state.width - px) < b.width / 2 ||
              Math.abs(this.state.y + this.state.height - py) < b.height / 2
            ) {
              handlePadding = true;
              break;
            }
          }
        }
      }
    }

    if (
      handlePadding &&
      this.sizers != null &&
      this.sizers.length > 0 &&
      this.sizers[0] != null
    ) {
      tol /= 2;

      result.x = this.sizers[0].bounds.width + tol;
      result.y = this.sizers[0].bounds.height + tol;
    } else {
      result = vertexHandlerGetHandlePadding.apply(this, []);
    }

    return result;
  },

  /**
   * Updates the hint for the current operation.
   */
  updateHint: function (_me) {
    if (this.index != mxEvent.LABEL_HANDLE) {
      if (this.hint == null) {
        this.hint = createHint();
        this.state.view.graph.container.appendChild(this.hint);
      }

      if (this.index == mxEvent.ROTATION_HANDLE) {
        this.hint.innerHTML = this.currentAlpha + "&deg;";
      } else {
        var s = this.state.view.scale;
        var unit = this.state.view.unit;
        this.hint.innerHTML =
          formatHintText(this.roundLength(this.bounds.width / s), unit) +
          " x " +
          formatHintText(this.roundLength(this.bounds.height / s), unit);
      }

      var rot =
        this.currentAlpha != null
          ? this.currentAlpha
          : this.state.style[mxConstants.STYLE_ROTATION] || "0";
      var bb = mxUtils.getBoundingBox(this.bounds, rot);

      if (bb == null) {
        bb = this.bounds;
      }

      this.hint.style.left =
        bb.x + Math.round((bb.width - this.hint.clientWidth) / 2) + "px";
      this.hint.style.top = bb.y + bb.height + hintOffset + "px";

      if (this.linkHint != null) {
        this.linkHint.style.display = "none";
      }
    }
  },

  /**
   * Updates the hint for the current operation.
   */
  removeHint: function () {
    mxGraphHandler.prototype.removeHint.apply(this, []);

    if (this.linkHint != null) {
      this.linkHint.style.display = "";
    }
  },

  handleImage: hoverProto.mainHandle,
  secondaryHandleImage: hoverProto.secondaryHandle,

  // Adds rotation handle and live preview
  rotationEnabled: true,
  manageSizers: true,
  livePreview: true,

  destroy: function () {
    var vertexHandlerDestroy = mxVertexHandler.prototype.destroy;
    vertexHandlerDestroy.apply(this, []);

    if (this.rowMoveHandle != null) {
      this.rowMoveHandle.parentNode.removeChild(this.rowMoveHandle);
      this.rowMoveHandle = null;
      this.rowState = null;
    }

    if (this.linkHint != null) {
      this.linkHint.parentNode.removeChild(this.linkHint);
      this.linkHint = null;
    }

    if (this.changeHandler != null) {
      this.graph.getSelectionModel().removeListener(this.changeHandler);
      this.graph.getModel().removeListener(this.changeHandler);
      this.changeHandler = null;
    }

    if (this.editingHandler != null) {
      this.graph.removeListener(this.editingHandler);
      this.editingHandler = null;
    }
  },

  redrawHandles: function () {
    var vertexHandlerRedrawHandles = mxVertexHandler.prototype.redrawHandles;
    if (this.rowMoveHandle != null && this.rowState != null) {
      this.rowMoveHandle.style.left =
        this.rowState.x + this.rowState.width + "px";
      this.rowMoveHandle.style.top =
        this.rowState.y + this.rowState.height + "px";
    }

    // Shows rotation handle only if one vertex is selected
    if (this.rotationShape != null && this.rotationShape.node != null) {
      this.rotationShape.node.style.display =
        this.rowMoveHandle == null &&
        this.graph.getSelectionCount() == 1 &&
        (this.index == null || this.index == mxEvent.ROTATION_HANDLE)
          ? ""
          : "none";
    }

    vertexHandlerRedrawHandles.apply(this);

    if (this.state != null && this.linkHint != null) {
      var c = new mxPoint(this.state.getCenterX(), this.state.getCenterY());
      var tmp = new mxRectangle(
        this.state.x,
        this.state.y - 22,
        this.state.width + 24,
        this.state.height + 22
      );
      var bb = mxUtils.getBoundingBox(
        tmp,
        this.state.style[mxConstants.STYLE_ROTATION] || "0",
        c
      );
      var rs =
        bb != null
          ? mxUtils.getBoundingBox(
              this.state,
              this.state.style[mxConstants.STYLE_ROTATION] || "0"
            )
          : this.state;
      var tb = this.state.text != null ? this.state.text.boundingBox : null;

      if (bb == null) {
        bb = this.state;
      }

      var b = bb.y + bb.height;

      if (tb != null) {
        b = Math.max(b, tb.y + tb.height);
      }

      this.linkHint.style.left =
        Math.max(
          0,
          Math.round(rs.x + (rs.width - this.linkHint.clientWidth) / 2)
        ) + "px";
      this.linkHint.style.top =
        Math.round(b + this.verticalOffset / 2 + hintOffset) + "px";
    }
  },

  setHandlesVisible: function (visible) {
    var vertexHandlerSetHandlesVisible =
      mxVertexHandler.prototype.setHandlesVisible;

    vertexHandlerSetHandlesVisible.apply(this, [visible]);

    if (this.rowMoveHandle != null) {
      this.rowMoveHandle.style.display = visible ? "" : "none";
    }
  },

  updateLinkHint: function (link, links) {
    try {
      if (
        (link == null && (links == null || links.length == 0)) ||
        this.graph.getSelectionCount() > 1
      ) {
        if (this.linkHint != null) {
          this.linkHint.parentNode.removeChild(this.linkHint);
          this.linkHint = null;
        }
      } else if (link != null || (links != null && links.length > 0)) {
        if (this.linkHint == null) {
          this.linkHint = createHint();
          this.linkHint.style.padding = "6px 8px 6px 8px";
          this.linkHint.style.opacity = "1";
          this.linkHint.style.filter = "";

          this.graph.container.appendChild(this.linkHint);
        }

        this.linkHint.innerHTML = "";

        if (link != null) {
          this.linkHint.appendChild(this.graph.createLinkForHint(link));

          if (
            this.graph.isEnabled() &&
            typeof this.graph.editLink === "function"
          ) {
            var changeLink = document.createElement("img");
            changeLink.setAttribute("src", editImage);
            changeLink.setAttribute("title", mxResources.get("editLink"));
            changeLink.setAttribute("width", "11");
            changeLink.setAttribute("height", "11");
            changeLink.style.marginLeft = "10px";
            changeLink.style.marginBottom = "-1px";
            changeLink.style.cursor = "pointer";
            this.linkHint.appendChild(changeLink);

            mxEvent.addListener(changeLink, "click", (evt) => {
              this.graph.setSelectionCell(this.state.cell);
              this.graph.editLink();
              mxEvent.consume(evt);
            });

            var removeLink = document.createElement("img");
            removeLink.setAttribute("src", clearImage);
            removeLink.setAttribute(
              "title",
              mxResources.get("removeIt", [mxResources.get("link")])
            );
            removeLink.setAttribute("width", "13");
            removeLink.setAttribute("height", "10");
            removeLink.style.marginLeft = "4px";
            removeLink.style.marginBottom = "-1px";
            removeLink.style.cursor = "pointer";
            this.linkHint.appendChild(removeLink);

            mxEvent.addListener(removeLink, "click", (evt) => {
              this.graph.setLinkForCell(this.state.cell, null);
              mxEvent.consume(evt);
            });
          }
        }

        if (links != null) {
          for (var i = 0; i < links.length; i++) {
            var div = document.createElement("div");
            div.style.marginTop = link != null || i > 0 ? "6px" : "0px";
            div.appendChild(
              this.graph.createLinkForHint(
                links[i].getAttribute("href"),
                mxUtils.getTextContent(links[i])
              )
            );

            this.linkHint.appendChild(div);
          }
        }
      }
    } catch (e) {
      // ignore
    }
  },

  init: function () {
    var vertexHandlerInit = mxVertexHandler.prototype.init;
    vertexHandlerInit.apply(this, []);
    var redraw = false;

    if (this.rotationShape != null) {
      this.rotationShape.node.setAttribute(
        "title",
        mxResources.get("rotateTooltip")
      );
    }

    this.rowState = null;

    if (this.graph.isTableRow(this.state.cell)) {
      this.rowState = this.state;
    } else if (this.graph.isTableCell(this.state.cell)) {
      this.rowState = this.graph.view.getState(
        this.graph.model.getParent(this.state.cell)
      );
    }

    if (this.rowState != null) {
      this.rowMoveHandle = mxUtils.createImage(moveImage);
      this.rowMoveHandle.style.position = "absolute";
      this.rowMoveHandle.style.cursor = "pointer";
      this.rowMoveHandle.style.width = "24px";
      this.rowMoveHandle.style.height = "24px";
      this.graph.container.appendChild(this.rowMoveHandle);

      mxEvent.addGestureListeners(
        this.rowMoveHandle,
        (evt) => {
          this.graph.graphHandler.start(
            this.state.cell,
            mxEvent.getClientX(evt),
            mxEvent.getClientY(evt),
            [this.rowState.cell]
          );
          this.graph.graphHandler.cellWasClicked = true;
          this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
          this.graph.isMouseDown = true;
          mxEvent.consume(evt);
        },
        undefined,
        undefined
      );
    }

    var update = () => {
      if (this.specialHandle != null) {
        this.specialHandle.node.style.display =
          this.graph.isEnabled() &&
          this.graph.getSelectionCount() < this.graph.graphHandler.maxCells
            ? ""
            : "none";
      }

      this.redrawHandles();
    };

    this.changeHandler = (_sender, _evt) => {
      this.updateLinkHint(
        this.graph.getLinkForCell(this.state.cell),
        this.graph.getLinksForState(this.state)
      );
      update();
    };

    this.graph
      .getSelectionModel()
      .addListener(mxEvent.CHANGE, this.changeHandler);
    this.graph.getModel().addListener(mxEvent.CHANGE, this.changeHandler);

    // Repaint needed when editing stops and no change event is fired
    this.editingHandler = (_sender, _evt) => {
      this.redrawHandles();
    };

    this.graph.addListener(mxEvent.EDITING_STOPPED, this.editingHandler);

    var link = this.graph.getLinkForCell(this.state.cell);
    var links = this.graph.getLinksForState(this.state);
    this.updateLinkHint(link, links);

    if (link != null || (links != null && links.length > 0)) {
      redraw = true;
    }

    if (redraw) {
      this.redrawHandles();
    }
  },

  mouseUp: function (sender, me) {
    var vertexHandlerMouseUp = mxVertexHandler.prototype.mouseUp;
    vertexHandlerMouseUp.apply(this, [sender, me]);

    // Shows rotation handle only if one vertex is selected
    if (this.rotationShape != null && this.rotationShape.node != null) {
      this.rotationShape.node.style.display =
        this.graph.getSelectionCount() == 1 ? "" : "none";
    }

    if (this.linkHint != null && this.linkHint.style.display == "none") {
      this.linkHint.style.display = "";
    }
  },

  // Workaround for "isConsumed not defined" in MS Edge is to use arguments
  mouseMove: function (sender, me) {
    var vertexHandlerMouseMove = mxVertexHandler.prototype.mouseMove;
    vertexHandlerMouseMove.apply(this, [sender, me]);

    if (this.graph.graphHandler.first != null) {
      if (this.rotationShape != null && this.rotationShape.node != null) {
        this.rotationShape.node.style.display = "none";
      }

      if (this.linkHint != null && this.linkHint.style.display != "none") {
        this.linkHint.style.display = "none";
      }
    }
  },

  // Invokes turn on single click on rotation handle
  rotateClick: function () {
    var stroke = mxUtils.getValue(
      this.state.style,
      mxConstants.STYLE_STROKECOLOR,
      mxConstants.NONE
    );
    var fill = mxUtils.getValue(
      this.state.style,
      mxConstants.STYLE_FILLCOLOR,
      mxConstants.NONE
    );

    if (
      this.state.view.graph.model.isVertex(this.state.cell) &&
      stroke == mxConstants.NONE &&
      fill == mxConstants.NONE
    ) {
      var angle = mxUtils.mod(
        mxUtils.getValue(this.state.style, mxConstants.STYLE_ROTATION, 0) + 90,
        360
      );
      this.state.view.graph.setCellStyles(mxConstants.STYLE_ROTATION, angle, [
        this.state.cell,
      ]);
    } else {
      this.state.view.graph.turnShapes([this.state.cell]);
    }
  },

  // Redirects moving of edge labels to mxGraphHandler by not starting here.
  // This will use the move preview of mxGraphHandler (see above).

  mouseDown: function (sender, me) {
    var mxVertexHandlerMouseDown = mxVertexHandler.prototype.mouseDown;
    var model = this.graph.getModel();
    var parent = model.getParent(this.state.cell);
    var geo = this.graph.getCellGeometry(this.state.cell);

    // Lets rotation events through
    var handle = this.getHandleForEvent(me);

    if (
      handle == mxEvent.ROTATION_HANDLE ||
      !model.isEdge(parent) ||
      geo == null ||
      !geo.relative ||
      this.state == null ||
      this.state.width >= 2 ||
      this.state.height >= 2
    ) {
      mxVertexHandlerMouseDown.apply(this, [sender, me]);
    }
  },

  // Shows rotation handle for edge labels.
  isRotationHandleVisible: function () {
    return (
      this.graph.isEnabled() &&
      this.rotationEnabled &&
      this.graph.isCellRotatable(this.state.cell) &&
      (mxGraphHandler.prototype.maxCells <= 0 ||
        this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells)
    );
  },

  // Uses text bounding box for edge labels
  getSelectionBounds: function (state) {
    var mxVertexHandlerGetSelectionBounds =
      mxVertexHandler.prototype.getSelectionBounds;

    var model = this.graph.getModel();
    var parent = model.getParent(state.cell);
    var geo = this.graph.getCellGeometry(state.cell);

    if (
      model.isEdge(parent) &&
      geo != null &&
      geo.relative &&
      state.width < 2 &&
      state.height < 2 &&
      state.text != null &&
      state.text.boundingBox != null
    ) {
      var bbox = state.text.unrotatedBoundingBox || state.text.boundingBox;

      return new mxRectangle(
        Math.round(bbox.x),
        Math.round(bbox.y),
        Math.round(bbox.width),
        Math.round(bbox.height)
      );
    } else {
      return mxVertexHandlerGetSelectionBounds.apply(this, [state]);
    }
  },

  createSizerShape: function (bounds, index, fillColor) {
    var vertexHandlerCreateSizerShape =
      mxVertexHandler.prototype.createSizerShape;
    this.handleImage =
      index == mxEvent.ROTATION_HANDLE
        ? rotationHandle
        : index == mxEvent.LABEL_HANDLE
        ? this.secondaryHandleImage
        : this.handleImage;

    return vertexHandlerCreateSizerShape.apply(this, [
      bounds,
      index,
      fillColor,
    ]);
  },

  // Disables custom handles if shift is pressed
  isCustomHandleEvent: function (me) {
    return !mxEvent.isShiftDown(me.getEvent());
  },

  parentHighlightEnabled: true,
});
