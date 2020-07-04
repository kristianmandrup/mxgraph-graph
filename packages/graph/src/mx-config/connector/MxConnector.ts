import mx from "@mxgraph-app/mx";
import { Class } from "../Class";
import { Graph } from "../../graph";
const { mxPoint, mxUtils, mxConnector, mxConstants } = mx;

export const MxConstraintHandler = Class.extend({
  /**
   * Overrides painting the actual shape for taking into account jump style.
   */

  paintLine: function (c, absPts, rounded) {
    const { state, strokewidth, scale } = this;
    var mxConnectorPaintLine = mxConnector.prototype.paintLine;
    const stRp = state["routedPoints"];
    // Required for checking dirty state
    this.routedPoints = state ? stRp : null;

    if (
      this.outline ||
      state == null ||
      style == null ||
      stRp == null ||
      stRp.length == 0
    ) {
      mxConnectorPaintLine.apply(this, [c, absPts, rounded]);
    } else {
      var arcSize =
        mxUtils.getValue(
          style,
          mxConstants.STYLE_ARCSIZE,
          mxConstants.LINE_ARCSIZE
        ) / 2;
      var size =
        (parseInt(mxUtils.getValue(style, "jumpSize", Graph.defaultJumpSize)) -
          2) /
          2 +
        strokewidth;
      var style = mxUtils.getValue(style, "jumpStyle", "none");
      var moveTo: any;
      var last: any;
      var len: any;
      var pts: any[] = [];
      var n: any;
      c.begin();

      for (var i = 0; i < stRp.length; i++) {
        var rpt = stRp[i];
        var pt = new mxPoint(rpt.x / scale, rpt.y / scale);

        // Takes first and last point from passed-in array
        if (i == 0) {
          pt = absPts[0];
        } else if (i == stRp.length - 1) {
          pt = absPts[absPts.length - 1];
        }

        var done = false;

        // Type 1 is an intersection
        if (last != null && rpt.type == 1) {
          // Checks if next/previous points are too close
          var next = stRp[i + 1];
          var dx = next.x / scale - pt.x;
          var dy = next.y / scale - pt.y;
          var dist = dx * dx + dy * dy;

          if (n == null) {
            n = new mxPoint(pt.x - last.x, pt.y - last.y);
            len = Math.sqrt(n.x * n.x + n.y * n.y);

            if (len > 0) {
              n.x = (n.x * size) / len;
              n.y = (n.y * size) / len;
            } else {
              n = null;
            }
          }

          if (dist > size * size && len > 0) {
            var dx = last.x - pt.x;
            var dy = last.y - pt.y;
            var dist = dx * dx + dy * dy;

            if (dist > size * size) {
              var p0 = new mxPoint(pt.x - n.x, pt.y - n.y);
              var p1 = new mxPoint(pt.x + n.x, pt.y + n.y);
              pts.push(p0);

              this.addPoints(c, pts, rounded, arcSize, false, null, moveTo);

              var f =
                Math.round(n.x) < 0 ||
                (Math.round(n.x) == 0 && Math.round(n.y) <= 0)
                  ? 1
                  : -1;
              moveTo = false;

              if (style == "sharp") {
                c.lineTo(p0.x - n.y * f, p0.y + n.x * f);
                c.lineTo(p1.x - n.y * f, p1.y + n.x * f);
                c.lineTo(p1.x, p1.y);
              } else if (style == "arc") {
                f *= 1.3;
                c.curveTo(
                  p0.x - n.y * f,
                  p0.y + n.x * f,
                  p1.x - n.y * f,
                  p1.y + n.x * f,
                  p1.x,
                  p1.y
                );
              } else {
                c.moveTo(p1.x, p1.y);
                moveTo = true;
              }

              pts = [p1];
              done = true;
            }
          }
        } else {
          n = null;
        }

        if (!done) {
          pts.push(pt);
          last = pt;
        }
      }

      this.addPoints(c, pts, rounded, arcSize, false, null, moveTo);
      c.stroke();
    }
  },
});
