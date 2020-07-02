import mx from "@mxgraph-app/mx";
const { mxCellRenderer } = mx;

export class CellRendererConfig {
  configure() {
    this.setInitializeLabel();

    return mxCellRenderer;
  }

  setInitializeLabel() {
    /**
     * Handling of special nl2Br style for not converting newlines to breaks in HTML labels.
     * NOTE: Since it's easier to set this when the label is created we assume that it does
     * not change during the lifetime of the mxText instance.
     */
    var mxCellRendererInitializeLabel =
      mxCellRenderer.prototype.initializeLabel;
    mxCellRenderer.prototype.initializeLabel(state);
    {
      if (state.text != null) {
        state.text.replaceLinefeeds =
          mxUtils.getValue(state.style, "nl2Br", "1") != "0";
      }

      mxCellRendererInitializeLabel.apply(this, arguments);
    }
  }
}
