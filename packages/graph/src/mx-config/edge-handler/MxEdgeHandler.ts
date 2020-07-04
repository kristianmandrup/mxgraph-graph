import mx from "@mxgraph-app/mx";
import { formatHintText } from "../helpers";
import { HoverIcons } from "../../hover/HoverIcons";
const {
  mxRectangleShape,
  mxRectangle,
  mxEvent,
  mxEdgeHandler,
  mxVertexHandler,
  mxElbowEdgeHandler,
  mxImageShape,
  mxConstants,
  mxUtils,
} = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxEdgeHandler = Class.extend({
  documentMode: document["documentMode"],

  $$init: function (state) {
    mxEdgeHandler.apply(this, [state]);
  },

  /**
   * Hides link hint while moving cells.
   */

  mouseMove: function (sender, me) {
    const edgeHandlerMouseMove = mxEdgeHandler.prototype.mouseMove;
    edgeHandlerMouseMove.apply(this, [sender, me]);
    const { linkHint, graph } = this;
    if (
      graph.graphHandler != null &&
      graph.graphHandler.first != null &&
      linkHint != null &&
      linkHint.style.display != "none"
    ) {
      linkHint.style.display = "none";
    }
  },

  /**
   * Hides link hint while moving cells.
   */
  mouseUp: function (sender, me) {
    const edgeHandlerMouseUp = mxEdgeHandler.prototype.mouseUp;
    edgeHandlerMouseUp.apply(this, [sender, me]);
    const { linkHint } = this;
    if (linkHint != null && linkHint.style.display == "none") {
      linkHint.style.display = "";
    }
  },

  /**
   * Updates the hint for the current operation.
   */

  updateHint: function (me, point) {
    const {
      createHint,
      graph,
      roundLength,
      isSource,
      isTarget,
      constraintHandler,
      marker,
      hintOffset,
      state,
      hint,
      linkHint,
    } = this;

    if (hint == null) {
      this.hint = createHint();
      state.view.graph.container.appendChild(hint);
    }

    const t = graph.view.translate;
    const s = graph.view.scale;
    const x = roundLength(point.x / s - t.x);
    const y = roundLength(point.y / s - t.y);
    const unit = graph.view.unit;

    hint.innerHTML = formatHintText(x, unit) + ", " + formatHintText(y, unit);
    hint.style.visibility = "visible";

    if (isSource || isTarget) {
      if (
        constraintHandler.currentConstraint != null &&
        constraintHandler.currentFocus != null
      ) {
        const pt = this.constraintHandler.currentConstraint.point;
        hint.innerHTML =
          "[" + Math.round(pt.x * 100) + "%, " + Math.round(pt.y * 100) + "%]";
      } else if (marker.hasValidState()) {
        hint.style.visibility = "hidden";
      }
    }

    hint.style.left = Math.round(me.getGraphX() - hint.clientWidth / 2) + "px";
    hint.style.top = Math.max(me.getGraphY(), point.y) + hintOffset + "px";

    if (linkHint != null) {
      linkHint.style.display = "none";
    }
  },

  /**
   * Updates the hint for the current operation.
   */
  removeHint: mxVertexHandler.prototype.removeHint,

  updatePreviewState: function (edge, point, terminalState, me, outline) {
    // Timer-based activation of outline connect in connection handler
    let startTime = new Date().getTime();
    const mxEdgeHandlerUpdatePreviewState =
      mxEdgeHandler.prototype.updatePreviewState;

    mxEdgeHandlerUpdatePreviewState.apply(this, [
      edge,
      point,
      terminalState,
      me,
      outline,
    ]);

    let timeOnTarget = 0;

    const { currentTerminalState } = this.proto;

    if (terminalState != currentTerminalState) {
      startTime = new Date().getTime();
      timeOnTarget = 0;
    } else {
      timeOnTarget = new Date().getTime() - startTime;
    }

    this.proto.currentTerminalState = terminalState;
  },

  hoverProto: HoverIcons.prototype,
  handleImage: this.hoverProto.mainHandle,
  terminalHandleImage: this.hoverProto.terminalHandle,
  fixedHandleImage: this.hoverProto.fixedHandle,
  labelHandleImage: this.hoverProto.secondaryHandle,

  parentHighlightEnabled: true,
  dblClickRemoveEnabled: true,
  straightRemoveEnabled: true,
  virtualBendsEnabled: true,
  mergeRemoveEnabled: true,
  manageLabelHandle: true,
  outlineConnect: true,

  // Disables adding waypoints if shift is pressed
  isAddVirtualBendEvent: function (me) {
    return !mxEvent.isShiftDown(me.getEvent());
  },

  // Disables custom handles if shift is pressed
  isCustomHandleEvent: function (me) {
    return !mxEvent.isShiftDown(me.getEvent());
  },

  redrawHandles: function () {
    const { state, linkHint, hintOffset } = this;
    const edgeHandlerRedrawHandles = mxEdgeHandler.prototype.redrawHandles;

    // Workaround for special case where handler
    // is reset before this which leads to a NPE
    if (this.marker != null) {
      edgeHandlerRedrawHandles.apply(this);

      if (state != null && linkHint != null) {
        let b = state;

        if (state.text != null && state.text.bounds != null) {
          b = new mxRectangle(b.x, b.y, b.width, b.height);
          b.add(state.text.bounds);
        }

        this.linkHint.style.left =
          Math.max(
            0,
            Math.round(b.x + (b.width - this.linkHint.clientWidth) / 2)
          ) + "px";
        this.linkHint.style.top =
          Math.round(b.y + b.height + hintOffset) + "px";
      }
    }
  },

  reset: function () {
    const { linkHint } = this;
    const edgeHandlerReset = mxEdgeHandler.prototype.reset;

    edgeHandlerReset.apply(this, []);

    if (linkHint != null) {
      linkHint.style.visibility = "";
    }
  },

  destroy: function () {
    const { linkHint, graph, changeHandler } = this;
    const edgeHandlerDestroy = mxEdgeHandler.prototype.destroy;

    edgeHandlerDestroy.apply(this, []);

    if (linkHint != null) {
      linkHint.parentNode.removeChild(linkHint);
      this.linkHint = null;
    }

    if (changeHandler != null) {
      graph.getModel().removeListener(changeHandler);
      graph.getSelectionModel().removeListener(changeHandler);
      this.changeHandler = null;
    }
  },

  updateLinkHint: mxVertexHandler.prototype["updateLinkHint"],

  init: function () {
    const edgeHandlerInit = mxEdgeHandler.prototype.init;

    edgeHandlerInit.apply(this, []);

    const { state, constraintHandler, changeHandler } = this;
    // Disables connection points
    constraintHandler.isEnabled = () => {
      return state.view.graph.connectionHandler.isEnabled();
    };

    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, changeHandler);
    this.graph.getModel().addListener(mxEvent.CHANGE, changeHandler);

    var link = this.graph.getLinkForCell(this.state.cell);
    var links = this.graph.getLinksForState(this.state);

    if (link != null || (links != null && links.length > 0)) {
      this.updateLinkHint(link, links);
      this.redrawHandles();
    }
  },

  update: function () {
    const { linkHint, graph, labelShape } = this;
    if (linkHint != null) {
      linkHint.style.display = graph.getSelectionCount() == 1 ? "" : "none";
    }

    if (labelShape != null) {
      labelShape.node.style.display =
        graph.isEnabled() &&
        graph.getSelectionCount() < this.graph.graphHandler.maxCells
          ? ""
          : "none";
    }
  },

  changeHandler: function (_sender, _evt) {
    const { update, updateLinkHint, redrawHandles } = this;
    updateLinkHint(
      this.graph.getLinkForCell(this.state.cell),
      this.graph.getLinksForState(this.state)
    );
    update();
    redrawHandles();
  },

  // Shows secondary handle for fixed connection points
  createHandleShape: function (index, _virtual) {
    const {
      graph,
      state,
      terminalHandleImage,
      handleImage,
      fixedHandleImage,
      preferHtml,
    } = this;

    var source = index != null && index == 0;
    var terminalState = state.getVisibleTerminalState(source);
    var c =
      index != null &&
      (index == 0 ||
        index >= this.state.absolutePoints.length - 1 ||
        (this.constructor == mxElbowEdgeHandler && index == 2))
        ? graph.getConnectionConstraint(state, terminalState, source)
        : null;

    var pt =
      c != null
        ? graph.getConnectionPoint(state.getVisibleTerminalState(source), c)
        : null;

    var img =
      pt != null
        ? fixedHandleImage
        : c != null && terminalState != null
        ? terminalHandleImage
        : handleImage;

    if (img != null) {
      const stroke = "line";
      const strokeWidth = "1";
      var shape = new mxImageShape(
        new mxRectangle(0, 0, img.width, img.height),
        img.src,
        stroke,
        strokeWidth
      );

      // Allows HTML rendering of the images
      shape.preserveImageAspect = false;

      return shape;
    } else {
      var s = mxConstants.HANDLE_SIZE;

      if (preferHtml) {
        s -= 1;
      }

      return new mxRectangleShape(
        new mxRectangle(0, 0, s, s),
        mxConstants.HANDLE_FILLCOLOR,
        mxConstants.HANDLE_STROKECOLOR
      );
    }
  },

  isOutlineConnectEvent: function (me) {
    const { currentTerminalState, timeOnTarget } = this;
    // Timer-based outline connect
    var mxEdgeHandlerIsOutlineConnectEvent =
      mxEdgeHandler.prototype.isOutlineConnectEvent;

    return (
      (currentTerminalState != null &&
        me.getState() == currentTerminalState &&
        timeOnTarget > 2000) ||
      ((currentTerminalState == null ||
        mxUtils.getValue(currentTerminalState.style, "outlineConnect", "1") !=
          "0") &&
        mxEdgeHandlerIsOutlineConnectEvent.apply(this, [me]))
    );
  },

  // Enables snapping to off-grid terminals for edge waypoints
  snapToTerminals: true,
});
