/**
 * Hints on handlers
 */
export function createHint() {
  var hint = document.createElement("div");
  hint.className = "geHint";
  hint.style.whiteSpace = "nowrap";
  hint.style.position = "absolute";

  return hint;
}

/**
 * Format pixels in the given unit
 */
export function formatHintText(pixels, unit) {
  switch (unit) {
    case mxConstants.POINTS:
      return pixels;
    case mxConstants.MILLIMETERS:
      return (pixels / mxConstants.PIXELS_PER_MM).toFixed(1);
    case mxConstants.INCHES:
      return (pixels / mxConstants.PIXELS_PER_INCH).toFixed(2);
  }
}
