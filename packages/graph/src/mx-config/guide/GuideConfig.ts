import mx from "@mxgraph-app/mx";
const { mxCellRenderer } = mx;

export class CellRendererConfig {
  configure() {
    this.setCreateGuideShape();

    return mxCellRenderer;
  }

  setCreateGuideShape() {
    /**
     * No dashed shapes.
     */
    mxGuide.prototype.createGuideShape = (horizontal) => {
      var guide = new mxPolyline(
        [],
        mxConstants.GUIDE_COLOR,
        mxConstants.GUIDE_STROKEWIDTH
      );

      return guide;
    };
  }
}
