export class TouchStyleConfig {
  configure() {
    /**
     * Implements touch style
     */
    if (Graph.touchStyle) {
      // Larger tolerance for real touch devices
      if (
        mxClient.IS_TOUCH ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      ) {
        mxShape.prototype.svgStrokeTolerance = 18;
        mxVertexHandler.prototype.tolerance = 12;
        mxEdgeHandler.prototype.tolerance = 12;
        Graph.prototype.tolerance = 12;

        mxVertexHandler.prototype.rotationHandleVSpacing = -16;

        // Implements a smaller tolerance for mouse events and a larger tolerance for touch
        // events on touch devices. The default tolerance (4px) is used for mouse events.
        mxConstraintHandler.prototype.getTolerance(me);
        {
          return mxEvent.isMouseEvent(me.getEvent())
            ? 4
            : this.graph.getTolerance();
        }
      }

      // One finger pans (no rubberband selection) must start regardless of mouse button
      mxPanningHandler.prototype.isPanningTrigger(me);
      {
        var evt = me.getEvent();

        return (
          (me.getState() == null && !mxEvent.isMouseEvent(evt)) ||
          (mxEvent.isPopupTrigger(evt) &&
            (me.getState() == null ||
              mxEvent.isControlDown(evt) ||
              mxEvent.isShiftDown(evt)))
        );
      }

      // Don't clear selection if multiple cells selected
      var graphHandlerMouseDown = mxGraphHandler.prototype.mouseDown;
      mxGraphHandler.prototype.mouseDown(sender, me);
      {
        graphHandlerMouseDown.apply(this, arguments);

        if (
          mxEvent.isTouchEvent(me.getEvent()) &&
          this.graph.isCellSelected(me.getCell()) &&
          this.graph.getSelectionCount() > 1
        ) {
          this.delayedSelection = false;
        }
      }
    }
    if (!Graph.touchStyle) {
      // Removes ctrl+shift as panning trigger for space splitting
      mxPanningHandler.prototype.isPanningTrigger(me);
      {
        var evt = me.getEvent();

        return (
          (mxEvent.isLeftMouseButton(evt) &&
            ((this.useLeftButtonForPanning && me.getState() == null) ||
              (mxEvent.isControlDown(evt) && !mxEvent.isShiftDown(evt)))) ||
          (this.usePopupTrigger && mxEvent.isPopupTrigger(evt))
        );
      }
    }
  }
}
