import mx from "@mxgraph-app/mx";
const {
  mxRectangleShape,
  mxPolyline,
  mxGraph,
  mxPoint,
  mxUtils,
  mxRectangle,
  mxMouseEvent,
  mxEvent,
  mxClient,
  mxConstants,
  mxGraphView,
} = mx;

// See: https://johnresig.com/blog/simple-javascript-inheritance/
import { Class } from "../Class";
import { formatHintText } from "../helpers";

/**
 *
 * Usage
 * const graph = {};
 * new MxCellEditor(graph);
 */
export const MxGraphView = Class.extend({
  $$init: function (graph) {
    mxGraphView.apply(this, [graph]);
  },

  formatUnitText: function (pixels) {
    return pixels ? formatHintText(pixels, this.unit) : pixels;
  },

  // Uses HTML for background pages (to support grid background image)
  validateBackgroundPage: function () {
    var graph = this.graph;
    if (graph.container != null && !graph.transparentBackground) {
      if (graph.pageVisible) {
        var bounds = this.getBackgroundPageBounds();

        if (this.backgroundPageShape == null) {
          // Finds first element in graph container
          var firstChild = graph.container.firstChild;

          while (
            firstChild != null &&
            firstChild.nodeType != mxConstants.NODETYPE_ELEMENT
          ) {
            firstChild = firstChild.nextSibling;
          }

          if (firstChild != null) {
            this.backgroundPageShape = this.createBackgroundPageShape(bounds);
            this.backgroundPageShape.scale = 1;

            // Shadow filter causes problems in outline window in quirks mode. IE8 standards
            // also has known rendering issues inside mxWindow but not using shadow is worse.
            this.backgroundPageShape.isShadow = !mxClient.IS_QUIRKS;
            this.backgroundPageShape.dialect = mxConstants.DIALECT_STRICTHTML;
            this.backgroundPageShape.init(graph.container);

            // Required for the browser to render the background page in correct order
            firstChild.style.position = "absolute";
            graph.container.insertBefore(
              this.backgroundPageShape.node,
              firstChild
            );
            this.backgroundPageShape.redraw();

            this.backgroundPageShape.node.className = "geBackgroundPage";

            // Adds listener for double click handling on background
            mxEvent.addListener(
              this.backgroundPageShape.node,
              "dblclick",
              (evt) => {
                graph.dblClick(evt);
              }
            );

            // Adds basic listeners for graph event dispatching outside of the
            // container and finishing the handling of a single gesture
            mxEvent.addGestureListeners(
              this.backgroundPageShape.node,
              (evt) => {
                graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
              },
              (evt) => {
                // Hides the tooltip if mouse is outside container
                if (
                  graph.tooltipHandler != null &&
                  graph.tooltipHandler.isHideOnHover()
                ) {
                  graph.tooltipHandler.hide();
                }

                if (graph.isMouseDown && !mxEvent.isConsumed(evt)) {
                  graph.fireMouseEvent(
                    mxEvent.MOUSE_MOVE,
                    new mxMouseEvent(evt)
                  );
                }
              },
              (evt) => {
                graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
              }
            );
          }
        } else {
          this.backgroundPageShape.scale = 1;
          this.backgroundPageShape.bounds = bounds;
          this.backgroundPageShape.redraw();
        }
      } else if (this.backgroundPageShape != null) {
        this.backgroundPageShape.destroy();
        this.backgroundPageShape = null;
      }

      this.validateBackgroundStyles();
    }
  },

  /**
   * Function: getGraphBounds
   *
   * Overrides getGraphBounds to use bounding box from SVG.
   */

  getGraphBounds: function () {
    var b = this.graphBounds;

    if (this.graph.useCssTransforms) {
      var t = this.graph.currentTranslate;
      var s = this.graph.currentScale;

      b = new mxRectangle(
        (b.x + t.x) * s,
        (b.y + t.y) * s,
        b.width * s,
        b.height * s
      );
    }

    return b;
  },
  /**
   * Function: viewStateChanged
   *
   * Overrides to bypass full cell tree validation.
   * TODO: Check if this improves performance
   */
  viewStateChanged: function () {
    if (this.graph.useCssTransforms) {
      this.validate();
      this.graph.sizeDidChange();
    } else {
      this.revalidate();
      this.graph.sizeDidChange();
    }
  },
  /**
   * Function: validate
   *
   * Overrides validate to normalize validation view state and pass
   * current state to CSS transform.
   */
  validate: function (cell) {
    const graphViewValidate = mxGraphView.prototype.validate;
    const { scale, translate } = this;
    if (this.graph.useCssTransforms) {
      this.graph.currentScale = scale;
      this.graph.currentTranslate.x = translate.x;
      this.graph.currentTranslate.y = translate.y;

      this.scale = 1;
      this.translate.x = 0;
      this.translate.y = 0;
    }

    graphViewValidate.apply(this, [cell]);

    if (this.graph.useCssTransforms) {
      this.graph.updateCssTransform();

      this.scale = this.graph.currentScale;
      this.translate.x = this.graph.currentTranslate.x;
      this.translate.y = this.graph.currentTranslate.y;
    }
  },
  /**
   * Updates jumps for valid edges and repaints if needed.
   */
  validateCellState: function (cell, recurse) {
    const mxGraphViewValidateCellState =
      mxGraphView.prototype.validateCellState;
    recurse = recurse != null ? recurse : true;
    var state = this.getState(cell);

    const { graph } = this;

    // Forces repaint if jumps change on a valid edge
    if (
      state != null &&
      recurse &&
      graph.model.isEdge(state.cell) &&
      state.style != null &&
      state.style[mxConstants.STYLE_CURVED] != 1 &&
      !state.invalid &&
      this.updateLineJumps(state)
    ) {
      graph.cellRenderer.redraw(state, false, this.isRendering());
    }

    state = mxGraphViewValidateCellState.apply(this, [cell, recurse]);

    // Adds to the list of edges that may intersect with later edges
    if (
      state != null &&
      recurse &&
      graph.model.isEdge(state.cell) &&
      state.style != null &&
      state.style[mxConstants.STYLE_CURVED] != 1
    ) {
      // LATER: Reuse jumps for valid edges
      this["validEdges"].push(state);
    }

    return state;
  },
  /**
   * Updates jumps for invalid edges.
   */
  updateCellState: function (state) {
    const mxGraphViewUpdateCellState = mxGraphView.prototype.updateCellState;
    mxGraphViewUpdateCellState.apply(this, [state]);
    const { graph } = this;

    // Updates jumps on invalid edge before repaint
    if (
      graph.model.isEdge(state.cell) &&
      state.style[mxConstants.STYLE_CURVED] != 1
    ) {
      this["updateLineJumps"](state);
    }
  },
  /**
   * Adds support for snapToPoint style.
   */
  updateFloatingTerminalPoint: function (edge, start, end, source) {
    const mxGraphViewUpdateFloatingTerminalPoint =
      mxGraphView.prototype.updateFloatingTerminalPoint;

    if (
      start != null &&
      edge != null &&
      (start.style["snapToPoint"] == "1" || edge.style["snapToPoint"] == "1")
    ) {
      start = this.getTerminalPort(edge, start, source);
      var next = this.getNextPoint(edge, end, source);

      var orth = this.graph.isOrthogonal(edge);
      var alpha = mxUtils.toRadians(
        Number(start.style[mxConstants.STYLE_ROTATION] || "0")
      );
      var center = new mxPoint(start.getCenterX(), start.getCenterY());

      if (alpha != 0) {
        var cos = Math.cos(-alpha);
        var sin = Math.sin(-alpha);
        next = mxUtils.getRotatedPoint(next, cos, sin, center);
      }

      var border = parseFloat(
        edge.style[mxConstants.STYLE_PERIMETER_SPACING] || 0
      );
      border += parseFloat(
        edge.style[
          source
            ? mxConstants.STYLE_SOURCE_PERIMETER_SPACING
            : mxConstants.STYLE_TARGET_PERIMETER_SPACING
        ] || 0
      );
      var pt = this.getPerimeterPoint(start, next, alpha == 0 && orth, border);

      if (alpha != 0) {
        var cos = Math.cos(alpha);
        var sin = Math.sin(alpha);
        pt = mxUtils.getRotatedPoint(pt, cos, sin, center);
      }

      edge.setAbsoluteTerminalPoint(
        this.snapToAnchorPoint(edge, start, end, source, pt),
        source
      );
    } else {
      mxGraphViewUpdateFloatingTerminalPoint.apply(this, [
        edge,
        start,
        end,
        source,
      ]);
    }
  },
  snapToAnchorPoint: function (edge, start, _end, _source, pt) {
    const { graph } = this;
    if (start != null && edge != null) {
      var constraints = graph.getAllConnectionConstraints(start, null);
      var nearest: any;
      var dist: any;

      if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
          var cp = graph.getConnectionPoint(start, constraints[i]);

          if (cp != null) {
            var tmp =
              (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

            if (dist == null || tmp < dist) {
              nearest = cp;
              dist = tmp;
            }
          }
        }
      }

      if (nearest != null) {
        pt = nearest;
      }
    }

    return pt;
  },

  /**
   * Reset the list of processed edges.
   */
  resetValidationState: function () {
    const mxGraphViewResetValidationState =
      mxGraphView.prototype.resetValidationState;
    mxGraphViewResetValidationState.apply(this, []);

    this.validEdges = [];
  },

  /**
   * Updates the jumps between given state and processed edges.
   */
  updateLineJumps: function (state) {
    const { addPoint, actual, lineJumpsEnabled, validEdges, scale } = this;
    var pts = state.absolutePoints;

    if (!lineJumpsEnabled) {
      return false;
    }
    let changed = !!state.routedPoints;
    if (
      pts != null &&
      validEdges != null &&
      mxUtils.getValue(state.style, "jumpStyle", "none") !== "none"
    ) {
      var thresh = 0.5 * scale;
      changed = false;
      this.actual = [];

      for (var i = 0; i < pts.length - 1; i++) {
        var p1 = pts[i + 1];
        var p0 = pts[i];
        var list: any[] = [];

        // Ignores waypoints on straight segments
        var pn = pts[i + 2];

        while (
          i < pts.length - 2 &&
          mxUtils.ptSegDistSq(p0.x, p0.y, pn.x, pn.y, p1.x, p1.y) <
            1 * this.scale * this.scale
        ) {
          p1 = pn;
          i++;
          pn = pts[i + 2];
        }

        changed = addPoint(0, p0.x, p0.y) || changed;

        // Processes all previous edges
        for (var e = 0; e < this.validEdges.length; e++) {
          var state2 = this.validEdges[e];
          var pts2 = state2.absolutePoints;

          if (
            pts2 != null &&
            mxUtils.intersects(state, state2) &&
            state2.style["noJump"] != "1"
          ) {
            // Compares each segment of the edge with the current segment
            for (var j = 0; j < pts2.length - 1; j++) {
              var p3 = pts2[j + 1];
              var p2 = pts2[j];

              // Ignores waypoints on straight segments
              pn = pts2[j + 2];

              while (
                j < pts2.length - 2 &&
                mxUtils.ptSegDistSq(p2.x, p2.y, pn.x, pn.y, p3.x, p3.y) <
                  1 * this.scale * this.scale
              ) {
                p3 = pn;
                j++;
                pn = pts2[j + 2];
              }

              var pt = mxUtils.intersection(
                p0.x,
                p0.y,
                p1.x,
                p1.y,
                p2.x,
                p2.y,
                p3.x,
                p3.y
              );

              // Handles intersection between two segments
              if (
                pt != null &&
                (Math.abs(pt.x - p0.x) > thresh ||
                  Math.abs(pt.y - p0.y) > thresh) &&
                (Math.abs(pt.x - p1.x) > thresh ||
                  Math.abs(pt.y - p1.y) > thresh) &&
                (Math.abs(pt.x - p2.x) > thresh ||
                  Math.abs(pt.y - p2.y) > thresh) &&
                (Math.abs(pt.x - p3.x) > thresh ||
                  Math.abs(pt.y - p3.y) > thresh)
              ) {
                var dx = pt.x - p0.x;
                var dy = pt.y - p0.y;
                var temp: any = {
                  distSq: dx * dx + dy * dy,
                  x: pt.x,
                  y: pt.y,
                };

                // Intersections must be ordered by distance from start of segment
                for (var t = 0; t < list.length; t++) {
                  if (list[t].distSq > temp.distSq) {
                    list.splice(t, 0, temp);
                    temp = null;
                    break;
                  }
                }

                // Ignores multiple intersections at segment joint
                if (
                  temp != null &&
                  (list.length == 0 ||
                    list[list.length - 1].x !== temp.x ||
                    list[list.length - 1].y !== temp.y)
                ) {
                  list.push(temp);
                }
              }
            }
          }
        }

        // Adds ordered intersections to routed points
        for (var j = 0; j < list.length; j++) {
          changed = addPoint(1, list[j].x, list[j].y) || changed;
        }
      }

      var pt = pts[pts.length - 1];
      changed = addPoint(0, pt.x, pt.y) || changed;
    }

    state.routedPoints = actual;

    return changed;
  },

  // Type 0 means normal waypoint, 1 means jump
  addPoint: function (type, x, y) {
    const { state, actual } = this;
    var rpt: any = new mxPoint(x, y);
    rpt.type = type;

    actual.push(rpt);
    var curr =
      state.routedPoints != null ? state.routedPoints[actual.length - 1] : null;

    return curr == null || curr.type != type || curr.x != x || curr.y != y;
  },

  // Updates the CSS of the background to draw the grid
  validateBackgroundStyles: function () {
    var graph = this.graph;
    var color =
      graph.background == null || graph.background == mxConstants.NONE
        ? graph.defaultPageBackgroundColor
        : graph.background;
    var gridColor =
      color != null && this.gridColor != color.toLowerCase()
        ? this.gridColor
        : "#ffffff";
    var image = "none";
    var position = "";

    if (graph.isGridEnabled()) {
      var phase = 10;

      if (mxClient.IS_SVG) {
        // Generates the SVG required for drawing the dynamic grid
        image = unescape(encodeURIComponent(this.createSvgGrid(gridColor)));
        image = btoa(image); // Base64.encode(image, true);
        image = "url(" + "data:image/svg+xml;base64," + image + ")";
        phase = graph.gridSize * this.scale * this.gridSteps;
      } else {
        // Fallback to grid wallpaper with fixed size
        image = "url(" + this.gridImage + ")";
      }

      var x0 = 0;
      var y0 = 0;

      if (graph.view.backgroundPageShape != null) {
        var bds = this.getBackgroundPageBounds();

        x0 = 1 + bds.x;
        y0 = 1 + bds.y;
      }

      // Computes the offset to maintain origin for grid
      position =
        -Math.round(
          phase - mxUtils.mod(this.translate.x * this.scale - x0, phase)
        ) +
        "px " +
        -Math.round(
          phase - mxUtils.mod(this.translate.y * this.scale - y0, phase)
        ) +
        "px";
    }

    var canvas = graph.view.canvas;

    if (canvas.ownerSVGElement != null) {
      canvas = canvas.ownerSVGElement;
    }

    if (graph.view.backgroundPageShape != null) {
      graph.view.backgroundPageShape.node.style.backgroundPosition = position;
      graph.view.backgroundPageShape.node.style.backgroundImage = image;
      graph.view.backgroundPageShape.node.style.backgroundColor = color;
      graph.container.className = "geDiagramContainer geDiagramBackdrop";
      canvas.style.backgroundImage = "none";
      canvas.style.backgroundColor = "";
    } else {
      graph.container.className = "geDiagramContainer";
      canvas.style.backgroundPosition = position;
      canvas.style.backgroundColor = color;
      canvas.style.backgroundImage = image;
    }
  },

  // Returns the SVG required for painting the background grid.
  createSvgGrid: function (color) {
    var tmp = this.graph.gridSize * this.scale;

    while (tmp < this.minGridSize) {
      tmp *= 2;
    }

    var tmp2 = this.gridSteps * tmp;

    // Small grid lines
    var d = [];

    for (var i = 1; i < this.gridSteps; i++) {
      var tmp3 = i * tmp;
      const txt =
        "M 0 " +
        tmp3 +
        " L " +
        tmp2 +
        " " +
        tmp3 +
        " M " +
        tmp3 +
        " 0 L " +
        tmp3 +
        " " +
        tmp2;
      this.addToArr(d, txt);
    }

    // KNOWN: Rounding errors for certain scales (eg. 144%, 121% in Chrome, FF and Safari). Workaround
    // in Chrome is to use 100% for the svg size, but this results in blurred grid for large diagrams.
    var size = tmp2;
    var svg =
      '<svg width="' +
      size +
      '" height="' +
      size +
      '" xmlns="' +
      mxConstants.NS_SVG +
      '">' +
      '<defs><pattern id="grid" width="' +
      tmp2 +
      '" height="' +
      tmp2 +
      '" patternUnits="userSpaceOnUse">' +
      '<path d="' +
      d.join(" ") +
      '" fill="none" stroke="' +
      color +
      '" opacity="0.2" stroke-width="1"/>' +
      '<path d="M ' +
      tmp2 +
      " 0 L 0 0 0 " +
      tmp2 +
      '" fill="none" stroke="' +
      color +
      '" stroke-width="1"/>' +
      '</pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>';

    return svg;
  },

  // Adds panning for the grid with no page view and disabled scrollbars
  panGraph: function (dx, dy) {
    const mxGraphPanGraph = mxGraph.prototype.panGraph;
    mxGraphPanGraph.apply(this, [dx, dy]);

    if (this.shiftPreview1 != null) {
      var canvas = this.view.canvas;

      if (this.ownerSVGElement != null) {
        canvas = canvas.ownerSVGElement;
      }

      var phase = this.gridSize * this.view.scale * this.view.gridSteps;
      var position =
        -Math.round(
          phase -
            mxUtils.mod(this.view.translate.x * this.view.scale + dx, phase)
        ) +
        "px " +
        -Math.round(
          phase -
            mxUtils.mod(this.view.translate.y * this.view.scale + dy, phase)
        ) +
        "px";
      canvas.style.backgroundPosition = position;
    }
  },

  updatePageBreaks: function (visible, width, height) {
    var scale = this.view.scale;
    var tr = this.view.translate;
    var fmt = this.pageFormat;
    var ps = scale * this.pageScale;

    var bounds2 = this.view.getBackgroundPageBounds();

    width = bounds2.width;
    height = bounds2.height;
    var bounds = new mxRectangle(
      scale * tr.x,
      scale * tr.y,
      fmt.width * ps,
      fmt.height * ps
    );

    // Does not show page breaks if the scale is too small
    visible =
      visible && Math.min(bounds.width, bounds.height) > this.minPageBreakDist;

    var horizontalCount = visible ? Math.ceil(height / bounds.height) - 1 : 0;
    var verticalCount = visible ? Math.ceil(width / bounds.width) - 1 : 0;
    var right = bounds2.x + width;
    var bottom = bounds2.y + height;

    if (this.horizontalPageBreaks == null && horizontalCount > 0) {
      this.horizontalPageBreaks = [];
    }

    if (this.verticalPageBreaks == null && verticalCount > 0) {
      this.verticalPageBreaks = [];
    }

    var drawPageBreaks = (breaks) => {
      if (breaks != null) {
        var count =
          breaks == this.horizontalPageBreaks ? horizontalCount : verticalCount;

        for (var i = 0; i <= count; i++) {
          var pts =
            breaks == this.horizontalPageBreaks
              ? [
                  new mxPoint(
                    Math.round(bounds2.x),
                    Math.round(bounds2.y + (i + 1) * bounds.height)
                  ),
                  new mxPoint(
                    Math.round(right),
                    Math.round(bounds2.y + (i + 1) * bounds.height)
                  ),
                ]
              : [
                  new mxPoint(
                    Math.round(bounds2.x + (i + 1) * bounds.width),
                    Math.round(bounds2.y)
                  ),
                  new mxPoint(
                    Math.round(bounds2.x + (i + 1) * bounds.width),
                    Math.round(bottom)
                  ),
                ];

          if (breaks[i] != null) {
            breaks[i].points = pts;
            breaks[i].redraw();
          } else {
            var pageBreak = new mxPolyline(pts, this.pageBreakColor);
            pageBreak.dialect = this.dialect;
            pageBreak.isDashed = this.pageBreakDashed;
            pageBreak.pointerEvents = false;
            pageBreak.init(this.view.backgroundPane);
            pageBreak.redraw();

            breaks[i] = pageBreak;
          }
        }

        for (var i = count; i < breaks.length; i++) {
          breaks[i].destroy();
        }

        breaks.splice(count, breaks.length - count);
      }
    };

    drawPageBreaks(this.horizontalPageBreaks);
    drawPageBreaks(this.verticalPageBreaks);
  },

  // Fits the number of background pages to the graph
  getBackgroundPageBounds: function () {
    var gb = mxGraphView.prototype.getGraphBounds();

    // Computes unscaled, untranslated graph bounds
    var x = gb.width > 0 ? gb.x / this.scale - this.translate.x : 0;
    var y = gb.height > 0 ? gb.y / this.scale - this.translate.y : 0;
    var w = gb.width / this.scale;
    var h = gb.height / this.scale;

    var fmt = this.graph.pageFormat;
    var ps = this.graph.pageScale;

    var pw = fmt.width * ps;
    var ph = fmt.height * ps;

    var x0 = Math.floor(Math.min(0, x) / pw);
    var y0 = Math.floor(Math.min(0, y) / ph);
    var xe = Math.ceil(Math.max(1, x + w) / pw);
    var ye = Math.ceil(Math.max(1, y + h) / ph);

    var rows = xe - x0;
    var cols = ye - y0;

    var bounds = new mxRectangle(
      this.scale * (this.translate.x + x0 * pw),
      this.scale * (this.translate.y + y0 * ph),
      this.scale * rows * pw,
      this.scale * cols * ph
    );

    return bounds;
  },

  // Creates background page shape
  createBackgroundPageShape: function (bounds) {
    return new mxRectangleShape(
      bounds,
      "#ffffff",
      this.graph.defaultPageBorderColor
    );
  },
});
