import Base64 from "Base64";
import mx from "@mxgraph-app/mx";
const { mxImage } = mx;

export class SvgImage {
  static encode(data) {
    return Base64.encode(data, true);
  }

  static create(w, h, data, coordWidth?, coordHeight?) {
    var tmp = unescape(
      encodeURIComponent(
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' +
          w +
          'px" height="' +
          h +
          'px" ' +
          (coordWidth != null && coordHeight != null
            ? 'viewBox="0 0 ' + coordWidth + " " + coordHeight + '" '
            : "") +
          'version="1.1">' +
          data +
          "</svg>"
      )
    );

    return new mxImage("data:image/svg+xml;base64," + this.encode(tmp), w, h);
  }
}
