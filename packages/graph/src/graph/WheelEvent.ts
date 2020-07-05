import mx from "@mxgraph-app/mx";
const { mxEvent, mxClient } = mx;

export class WheelEvent {
  /**
   * Returns true if the given mouse wheel event should be used for zooming. This
   * is invoked if no dialogs are showing and returns true with Alt or Control
   * (or cmd in macOS only) is pressed.
   */
  isZoomWheelEvent(evt) {
    return (
      mxEvent.isAltDown(evt) ||
      (mxEvent.isMetaDown(evt) && mxClient.IS_MAC) ||
      mxEvent.isControlDown(evt)
    );
  }

  /**
   * Returns true if the given scroll wheel event should be used for scrolling.
   */
  isScrollWheelEvent(evt) {
    return !this.isZoomWheelEvent(evt);
  }
}
