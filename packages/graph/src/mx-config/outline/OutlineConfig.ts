import mx from "@mxgraph-app/mx";
const { mxOutline } = mx;

export class OutlineConfig {
  configure() {
    this.setUpdate();

    return mxOutline;
  }

  setSizerImage() {
    mxOutline.prototype.sizerImage = HoverIcons.prototype.mainHandle;
  }
}
