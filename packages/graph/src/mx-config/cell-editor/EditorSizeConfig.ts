import mx from "@mxgraph-app/mx";
const { mxCellEditor, mxRectangle } = mx;

export class EditorSizeConfig {
  configure() {}

  graph: any;

  setGetMinimumSize() {
    const { graph } = this;
    mxCellEditor.prototype.getMinimumSize = (state) => {
      var scale = graph.getView().scale;

      return new mxRectangle(
        0,
        0,
        state.text == null ? 30 : state.text.size * scale + 20,
        30
      );
    };
  }
}
