import mx from "@mxgraph-app/mx";
const { mxCodec, mxUtils, mxStyleRegistry } = mx;
import resources from "@mxgraph-app/resources";
const { STYLE_PATH } = resources;

export class StylesheetLoader {
  defaultThemeName: any;
  themes: any;
  getStylesheet: any;

  /**
   * Loads the stylesheet for this graph.
   */
  loadStylesheet() {
    var node =
      this.themes != null
        ? this.themes[this.defaultThemeName]
        : !mxStyleRegistry["dynamicLoading"]
        ? null
        : mxUtils.load(STYLE_PATH + "/default.xml").getDocumentElement();

    if (node != null) {
      var dec = new mxCodec(node.ownerDocument);
      dec.decode(node, this.getStylesheet());
    }
  }
}
