import pako from "pako";
import mx from "@mxgraph-app/mx";
import { Zapper } from "./Zapper";
const { mxUtils } = mx;

export class Compresser {
  static zapGremlins(data) {
    return Zapper.zapGremlins(data);
  }

  /**
   * Returns a base64 encoded version of the compressed outer XML of the given node.
   */
  static compressNode(node, checked) {
    var xml = mxUtils.getXml(node);

    return this.compress(checked ? xml : this.zapGremlins(xml), null);
  }

  /**
   * Returns a base64 encoded version of the compressed string.
   */
  static compress(data, deflate) {
    if (data == null || data.length == 0 || typeof pako === "undefined") {
      return data;
    } else {
      var tmp = deflate
        ? pako.deflate(encodeURIComponent(data), { to: "string" })
        : pako.deflateRaw(encodeURIComponent(data), { to: "string" });

      return btoa(tmp); // : Base64.encode(tmp, true);
    }
  }

  /**
   * Returns a decompressed version of the base64 encoded string.
   */
  static decompress(data, inflate, checked) {
    if (data == null || data.length == 0 || typeof pako === "undefined") {
      return data;
    } else {
      var tmp = atob(data); // : Base64.decode(data, true);

      var inflated = decodeURIComponent(
        inflate
          ? pako.inflate(tmp, { to: "string" })
          : pako.inflateRaw(tmp, { to: "string" })
      );

      return checked ? inflated : this.zapGremlins(inflated);
    }
  }
}
