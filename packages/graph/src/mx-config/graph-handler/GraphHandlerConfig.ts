import mx from "@mxgraph-app/mx";
import { formatHintText } from "../helpers";
const { mxUtils, mxEvent, mxRectangle, mxGraphHandler } = mx;

export class GraphHandlerConfig {
  configure() {
    this.setMoveCells();

    return mxGraphHandler;
  }

  setMoveCells() {
    // Hold alt to ignore drop target
    var mxGraphHandlerMoveCells = mxGraphHandler.prototype.moveCells;

    mxGraphHandler.prototype.moveCells = (
      _cells,
      _dx,
      _dy,
      _clone,
      target,
      evt
    ) => {
      if (mxEvent.isAltDown(evt)) {
        target = null;
      }

      mxGraphHandlerMoveCells.apply(this, arguments);
    };
  }

  pBounds: any;
  shape: any;
  livePreviewActive: any;
  hint: any;
  createHint: any;
  graph: any;
  roundLength: any;
  currentDx: number = 0;
  currentDy: number = 0;
  bounds: any;

  hintOffset: any; // Editor.hintOffset

  setUpdateHint() {
    const {
      pBounds,
      shape,
      livePreviewActive,
      hint,
      createHint,
      graph,
      roundLength,
      currentDx,
      currentDy,
      bounds,
      hintOffset,
    } = this;
    /**
     * Updates the hint for the current operation.
     */
    mxGraphHandler.prototype.updateHint = (_me) => {
      if (pBounds != null && (shape != null || livePreviewActive)) {
        if (hint == null) {
          this.hint = createHint();
          graph.container.appendChild(this.hint);
        }

        var t = graph.view.translate;
        var s = graph.view.scale;
        var x = roundLength((bounds.x + currentDx) / s - t.x);
        var y = roundLength((bounds.y + currentDy) / s - t.y);
        var unit = this.graph.view.unit;

        this.hint.innerHTML =
          formatHintText(x, unit) + ", " + formatHintText(y, unit);

        this.hint.style.left =
          this.pBounds.x +
          this.currentDx +
          Math.round((this.pBounds.width - this.hint.clientWidth) / 2) +
          "px";
        this.hint.style.top =
          this.pBounds.y +
          this.currentDy +
          this.pBounds.height +
          hintOffset +
          "px";
      }
    };
  }

  setRemoveHint() {
    /**
     * Updates the hint for the current operation.
     */
    mxGraphHandler.prototype.removeHint = () => {
      if (this.hint != null) {
        this.hint.parentNode.removeChild(this.hint);
        this.hint = null;
      }
    };
  }

  getGuideStates() {
    // Ignores child cells with part style as guides
    var mxGraphHandlerGetGuideStates = mxGraphHandler.prototype.getGuideStates;

    mxGraphHandler.prototype.getGuideStates = () => {
      var states: any = mxGraphHandlerGetGuideStates.apply(this, arguments);
      var result: any[] = [];

      // NOTE: Could do via isStateIgnored hook
      for (var i = 0; i < states.length; i++) {
        if (mxUtils.getValue(states[i].style, "part", "0") != "1") {
          result.push(states[i]);
        }
      }

      return result;
    };
  }

  getBoundingBox() {
    // Special case for single edge label handle moving in which case the text bounding box is used
    var mxGraphHandlerGetBoundingBox = mxGraphHandler.prototype.getBoundingBox;
    mxGraphHandler.prototype.getBoundingBox = (cells) => {
      if (cells != null && cells.length == 1) {
        var model = this.graph.getModel();
        var parent = model.getParent(cells[0]);
        var geo = this.graph.getCellGeometry(cells[0]);

        if (model.isEdge(parent) && geo != null && geo.relative) {
          var state = this.graph.view.getState(cells[0]);

          if (
            state != null &&
            state.width < 2 &&
            state.height < 2 &&
            state.text != null &&
            state.text.boundingBox != null
          ) {
            return mxRectangle.fromRectangle(state.text.boundingBox);
          }
        }
      }

      return mxGraphHandlerGetBoundingBox.apply(this, arguments);
    };
  }

  setMaxLivePreview() {
    mxGraphHandler.prototype.maxLivePreview = 16;
  }
}
