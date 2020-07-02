import mx from "@mxgraph-app/mx";
const { mxVertexHandler } = mx;

export class VertexHandlerConfig {
  configure() {
    this.setRotationHandleVSpacing();
    this.setGetRotationHandlePosition();
    this.setIsRecursiveResize();
    this.setIsCenteredEvent();
    this.setGetHandlePadding();
    this.setUpdateHint();
    this.setRemoveHint();

    return mxVertexHandler;
  }

  setRotationHandleVSpacing() {
    /**
     * Moves rotation handle to top, right corner.
     */
    mxVertexHandler.prototype.rotationHandleVSpacing = -12;
  }

  setGetRotationHandlePosition() {
    mxVertexHandler.prototype.getRotationHandlePosition = () => {
      var padding = this.getHandlePadding();

      return new mxPoint(
        this.bounds.x +
          this.bounds.width -
          this.rotationHandleVSpacing +
          padding.x / 2,
        this.bounds.y + this.rotationHandleVSpacing - padding.y / 2
      );
    };
  }

  setIsRecursiveResize() {
    /**
     * Enables recursive resize for groups.
     */
    mxVertexHandler.prototype.isRecursiveResize = (state, me) => {
      return (
        this.graph.isRecursiveVertexResize(state) &&
        !mxEvent.isControlDown(me.getEvent())
      );
    };
  }

  setIsCenteredEvent() {
    /**
     * Enables centered resize events.
     */
    mxVertexHandler.prototype.isCenteredEvent = (state, me) => {
      return (
        (!(
          !this.graph.isSwimlane(state.cell) &&
          this.graph.model.getChildCount(state.cell) > 0 &&
          !this.graph.isCellCollapsed(state.cell) &&
          mxUtils.getValue(state.style, "recursiveResize", "1") == "1" &&
          mxUtils.getValue(state.style, "childLayout", null) == null
        ) &&
          mxEvent.isControlDown(me.getEvent())) ||
        mxEvent.isMetaDown(me.getEvent())
      );
    };
  }

  setGetHandlePadding() {
    /**
     * Adds handle padding for editing cells and exceptions.
     */
    var vertexHandlerGetHandlePadding =
      mxVertexHandler.prototype.getHandlePadding;
    mxVertexHandler.prototype.getHandlePadding = () => {
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
        result = vertexHandlerGetHandlePadding.apply(this, arguments);
      }

      return result;
    };
  }

  setUpdateHint() {
    /**
     * Updates the hint for the current operation.
     */
    mxVertexHandler.prototype.updateHint = (me) => {
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
        this.hint.style.top = bb.y + bb.height + Editor.hintOffset + "px";

        if (this.linkHint != null) {
          this.linkHint.style.display = "none";
        }
      }
    };
  }

  setRemoveHint() {
    /**
     * Updates the hint for the current operation.
     */
    mxVertexHandler.prototype.removeHint = () => {
      mxGraphHandler.prototype.removeHint.apply(this, arguments);

      if (this.linkHint != null) {
        this.linkHint.style.display = "";
      }
    };
  }
}

mxVertexHandler.prototype.handleImage = HoverIcons.prototype.mainHandle;
mxVertexHandler.prototype.secondaryHandleImage =
  HoverIcons.prototype.secondaryHandle;

// Adds rotation handle and live preview
mxVertexHandler.prototype.rotationEnabled = true;
mxVertexHandler.prototype.manageSizers = true;
mxVertexHandler.prototype.livePreview = true;

var vertexHandlerDestroy = mxVertexHandler.prototype.destroy;
mxVertexHandler.prototype.destroy = () => {
  vertexHandlerDestroy.apply(this, arguments);

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
};

var vertexHandlerRedrawHandles = mxVertexHandler.prototype.redrawHandles;
mxVertexHandler.prototype.redrawHandles = () => {
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
      Math.round(b + this.verticalOffset / 2 + Editor.hintOffset) + "px";
  }
};

var vertexHandlerSetHandlesVisible =
  mxVertexHandler.prototype.setHandlesVisible;

mxVertexHandler.prototype.setHandlesVisible = (visible) => {
  vertexHandlerSetHandlesVisible.apply(this, arguments);

  if (this.rowMoveHandle != null) {
    this.rowMoveHandle.style.display = visible ? "" : "none";
  }
};

mxVertexHandler.prototype.updateLinkHint = (link, links) => {
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
          changeLink.setAttribute("src", Editor.editImage);
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
          removeLink.setAttribute("src", Dialog.prototype.clearImage);
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
};

var vertexHandlerInit = mxVertexHandler.prototype.init;
mxVertexHandler.prototype.init = () => {
  vertexHandlerInit.apply(this, arguments);
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
    this.rowMoveHandle = mxUtils.createImage(Editor.moveImage);
    this.rowMoveHandle.style.position = "absolute";
    this.rowMoveHandle.style.cursor = "pointer";
    this.rowMoveHandle.style.width = "24px";
    this.rowMoveHandle.style.height = "24px";
    this.graph.container.appendChild(this.rowMoveHandle);

    mxEvent.addGestureListeners(this.rowMoveHandle, (evt) => {
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
    });
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

  this.changeHandler = (sender, evt) => {
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
  this.editingHandler = (sender, evt) => {
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
};

var vertexHandlerMouseUp = mxVertexHandler.prototype.mouseUp;

mxVertexHandler.prototype.mouseUp = (sender, me) => {
  vertexHandlerMouseUp.apply(this, arguments);

  // Shows rotation handle only if one vertex is selected
  if (this.rotationShape != null && this.rotationShape.node != null) {
    this.rotationShape.node.style.display =
      this.graph.getSelectionCount() == 1 ? "" : "none";
  }

  if (this.linkHint != null && this.linkHint.style.display == "none") {
    this.linkHint.style.display = "";
  }
};

var vertexHandlerMouseMove = mxVertexHandler.prototype.mouseMove;

// Workaround for "isConsumed not defined" in MS Edge is to use arguments
mxVertexHandler.prototype.mouseMove = (sender, me) => {
  vertexHandlerMouseMove.apply(this, arguments);

  if (this.graph.graphHandler.first != null) {
    if (this.rotationShape != null && this.rotationShape.node != null) {
      this.rotationShape.node.style.display = "none";
    }

    if (this.linkHint != null && this.linkHint.style.display != "none") {
      this.linkHint.style.display = "none";
    }
  }
};

// Invokes turn on single click on rotation handle
mxVertexHandler.prototype.rotateClick = () => {
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
};

// Redirects moving of edge labels to mxGraphHandler by not starting here.
// This will use the move preview of mxGraphHandler (see above).
var mxVertexHandlerMouseDown = mxVertexHandler.prototype.mouseDown;
mxVertexHandler.prototype.mouseDown = (sender, me) => {
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
    mxVertexHandlerMouseDown.apply(this, arguments);
  }
};

// Shows rotation handle for edge labels.
mxVertexHandler.prototype.isRotationHandleVisible = () => {
  return (
    this.graph.isEnabled() &&
    this.rotationEnabled &&
    this.graph.isCellRotatable(this.state.cell) &&
    (mxGraphHandler.prototype.maxCells <= 0 ||
      this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells)
  );
};

// Uses text bounding box for edge labels
var mxVertexHandlerGetSelectionBounds =
  mxVertexHandler.prototype.getSelectionBounds;
mxVertexHandler.prototype.getSelectionBounds = (state) => {
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
    return mxVertexHandlerGetSelectionBounds.apply(this, arguments);
  }
};

var vertexHandlerCreateSizerShape = mxVertexHandler.prototype.createSizerShape;
mxVertexHandler.prototype.createSizerShape = (bounds, index, fillColor) => {
  this.handleImage =
    index == mxEvent.ROTATION_HANDLE
      ? HoverIcons.prototype.rotationHandle
      : index == mxEvent.LABEL_HANDLE
      ? this.secondaryHandleImage
      : this.handleImage;

  return vertexHandlerCreateSizerShape.apply(this, arguments);
};

// Disables custom handles if shift is pressed
mxVertexHandler.prototype.isCustomHandleEvent = (me) => {
  return !mxEvent.isShiftDown(me.getEvent());
};

mxVertexHandler.prototype.parentHighlightEnabled = true;
