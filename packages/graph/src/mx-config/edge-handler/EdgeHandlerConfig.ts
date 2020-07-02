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

export class VertexHandlerConfig {
  configure() {
    this.setMouseMove();

    return mxEdgeHandler;
  }

  proto: any = mxEdgeHandler.prototype;
  linkHint: any;
  hintOffset: any; // = Editor.hintOffset;

  setMouseMove() {
    /**
     * Hides link hint while moving cells.
     */
    var edgeHandlerMouseMove = mxEdgeHandler.prototype.mouseMove;
    const { linkHint, graph } = this;
    mxEdgeHandler.prototype.mouseMove = (...args) => {
      edgeHandlerMouseMove.apply(this, [...args]);

      if (
        graph.graphHandler != null &&
        graph.graphHandler.first != null &&
        linkHint != null &&
        linkHint.style.display != "none"
      ) {
        linkHint.style.display = "none";
      }
    };
  }

  setMouseUp() {
    /**
     * Hides link hint while moving cells.
     */
    var edgeHandlerMouseUp = mxEdgeHandler.prototype.mouseUp;
    const proto: any = mxEdgeHandler.prototype;
    mxEdgeHandler.prototype.mouseUp = (...args) => {
      edgeHandlerMouseUp.apply(this, [...args]);
      const { linkHint } = proto;

      if (linkHint != null && linkHint.style.display == "none") {
        linkHint.style.display = "";
      }
    };
  }

  createHint: any; // () => void
  graph: any;
  roundLength: any;

  isSource: any;
  isTarget: any;
  constraintHandler: any;
  marker: any;

  setUpdateHint() {
    const {
      createHint,
      graph,
      roundLength,
      isSource,
      isTarget,
      constraintHandler,
      marker,
      hintOffset,
    } = this;
    /**
     * Updates the hint for the current operation.
     */
    const proto = mxEdgeHandler.prototype;
    mxEdgeHandler.prototype.updateHint = (me, point) => {
      const { state, hint, linkHint } = proto;
      if (hint == null) {
        proto.hint = createHint();
        state.view.graph.container.appendChild(hint);
      }

      var t = graph.view.translate;
      var s = graph.view.scale;
      var x = roundLength(point.x / s - t.x);
      var y = roundLength(point.y / s - t.y);
      var unit = graph.view.unit;

      hint.innerHTML = formatHintText(x, unit) + ", " + formatHintText(y, unit);
      hint.style.visibility = "visible";

      if (isSource || isTarget) {
        if (
          constraintHandler.currentConstraint != null &&
          constraintHandler.currentFocus != null
        ) {
          var pt = this.constraintHandler.currentConstraint.point;
          hint.innerHTML =
            "[" +
            Math.round(pt.x * 100) +
            "%, " +
            Math.round(pt.y * 100) +
            "%]";
        } else if (marker.hasValidState()) {
          hint.style.visibility = "hidden";
        }
      }

      hint.style.left =
        Math.round(me.getGraphX() - hint.clientWidth / 2) + "px";
      hint.style.top = Math.max(me.getGraphY(), point.y) + hintOffset + "px";

      if (linkHint != null) {
        linkHint.style.display = "none";
      }
    };
  }

  setRemoveHint() {
    /**
     * Updates the hint for the current operation.
     */
    mxEdgeHandler.prototype.removeHint = mxVertexHandler.prototype.removeHint;
  }

  setUpdatePreviewState() {
    // Timer-based activation of outline connect in connection handler
    let startTime = new Date().getTime();
    var mxEdgeHandlerUpdatePreviewState =
      mxEdgeHandler.prototype.updatePreviewState;

    mxEdgeHandler.prototype.updatePreviewState = (
      _edge,
      _point,
      terminalState,
      _me
    ) => {
      mxEdgeHandlerUpdatePreviewState.apply(this, arguments);
      let timeOnTarget = 0;

      const { currentTerminalState } = this.proto;

      if (terminalState != currentTerminalState) {
        startTime = new Date().getTime();
        timeOnTarget = 0;
      } else {
        timeOnTarget = new Date().getTime() - startTime;
      }

      this.proto.currentTerminalState = terminalState;
    };
  }

  setImages() {
    const hoverProto: any = HoverIcons.prototype;
    mxEdgeHandler.prototype.handleImage = hoverProto.mainHandle;
    mxEdgeHandler.prototype.terminalHandleImage = hoverProto.terminalHandle;
    mxEdgeHandler.prototype.fixedHandleImage = hoverProto.fixedHandle;
    mxEdgeHandler.prototype.labelHandleImage = hoverProto.secondaryHandle;
  }

  setFlags() {
    mxEdgeHandler.prototype.parentHighlightEnabled = true;
    mxEdgeHandler.prototype.dblClickRemoveEnabled = true;
    mxEdgeHandler.prototype.straightRemoveEnabled = true;
    mxEdgeHandler.prototype.virtualBendsEnabled = true;
    mxEdgeHandler.prototype.mergeRemoveEnabled = true;
    mxEdgeHandler.prototype.manageLabelHandle = true;
    mxEdgeHandler.prototype.outlineConnect = true;
  }

  setIsAddVirtualBendEvent() {
    // Disables adding waypoints if shift is pressed
    mxEdgeHandler.prototype.isAddVirtualBendEvent = (me) => {
      return !mxEvent.isShiftDown(me.getEvent());
    };
  }

  setIsCustomHandleEvent() {
    // Disables custom handles if shift is pressed
    mxEdgeHandler.prototype.isCustomHandleEvent = (me) => {
      return !mxEvent.isShiftDown(me.getEvent());
    };
  }

  setRedrawHandles() {
    const { state, linkHint } = this.proto;
    const { hintOffset } = this;
    var edgeHandlerRedrawHandles = mxEdgeHandler.prototype.redrawHandles;
    mxEdgeHandler.prototype.redrawHandles = () => {
      // Workaround for special case where handler
      // is reset before this which leads to a NPE
      if (this.marker != null) {
        edgeHandlerRedrawHandles.apply(this);

        if (state != null && linkHint != null) {
          var b = state;

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
    };
  }

  setReset() {
    const { linkHint } = this;
    var edgeHandlerReset = mxEdgeHandler.prototype.reset;
    mxEdgeHandler.prototype.reset = () => {
      edgeHandlerReset.apply(this, arguments);

      if (linkHint != null) {
        linkHint.style.visibility = "";
      }
    };
  }

  setDestroy() {
    const { linkHint, graph, changeHandler } = this;
    var edgeHandlerDestroy = mxEdgeHandler.prototype.destroy;
    mxEdgeHandler.prototype.destroy = () => {
      edgeHandlerDestroy.apply(this, arguments);

      if (linkHint != null) {
        linkHint.parentNode.removeChild(linkHint);
        this.linkHint = null;
      }

      if (changeHandler != null) {
        graph.getModel().removeListener(changeHandler);
        graph.getSelectionModel().removeListener(changeHandler);
        this.changeHandler = null;
      }
    };
  }

  setUpdateLinkHint() {
    mxEdgeHandler.prototype.updateLinkHint =
      mxVertexHandler.prototype.updateLinkHint;
  }

  state: any;
  labelShape: any;
  updateLinkHint: any;
  redrawHandles: any;

  init() {
    var edgeHandlerInit = mxEdgeHandler.prototype.init;
    mxEdgeHandler.prototype.init = () => {
      edgeHandlerInit.apply(this, arguments);

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
    };
  }

  update = () => {
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
  };

  changeHandler: any = (_sender, _evt) => {
    const { update, updateLinkHint, redrawHandles } = this;
    updateLinkHint(
      this.graph.getLinkForCell(this.state.cell),
      this.graph.getLinksForState(this.state)
    );
    update();
    redrawHandles();
  };

  fixedHandleImage: any;
  terminalHandleImage: any;
  handleImage: any;
  preferHtml: boolean = false;

  createHandleShape() {
    const {
      graph,
      state,
      terminalHandleImage,
      handleImage,
      fixedHandleImage,
      preferHtml,
    } = this;

    // Shows secondary handle for fixed connection points
    mxEdgeHandler.prototype.createHandleShape = (index, _virtual) => {
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
        var shape = new mxImageShape(
          new mxRectangle(0, 0, img.width, img.height),
          img.src
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
    };
  }

  currentTerminalState: any;
  timeOnTarget: any;

  isOutlineConnectEvent() {
    const { currentTerminalState, timeOnTarget } = this;
    // Timer-based outline connect
    var mxEdgeHandlerIsOutlineConnectEvent =
      mxEdgeHandler.prototype.isOutlineConnectEvent;

    mxEdgeHandler.prototype.isOutlineConnectEvent = (me) => {
      return (
        (currentTerminalState != null &&
          me.getState() == currentTerminalState &&
          timeOnTarget > 2000) ||
        ((currentTerminalState == null ||
          mxUtils.getValue(currentTerminalState.style, "outlineConnect", "1") !=
            "0") &&
          mxEdgeHandlerIsOutlineConnectEvent.apply(this, arguments))
      );
    };
  }
}
